import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { JobData } from './jobs.interface';

@Injectable()
export class JobsService {
  private readonly jobsFilePath = path.join(__dirname, '../../jobs.json');
  private readonly logger = new Logger(JobsService.name);

  constructor(@InjectQueue('jobs') private readonly jobsQueue: Queue) {}
  private readJobsFromFile(): JobData[] {
    try {
      const fileContent = fs.readFileSync(this.jobsFilePath, 'utf-8');
      return fileContent ? JSON.parse(fileContent) : [];
    } catch (error) {
      console.error('Error reading jobs from file:', error.message);
      return [];
    }
  }

  private writeJobsToFile(jobs: JobData[]): void {
    try {
      fs.writeFileSync(this.jobsFilePath, JSON.stringify(jobs, null, 2));
    } catch (error) {
      console.error('Error writing jobs to file:', error.message);
    }
  }

  async addJob(): Promise<string> {
    const jobs = this.readJobsFromFile();
    const newJob: JobData = {
      jobId: this.generateJobId(),
      createdAt: new Date(),
      status: 'PENDING',
    };
    jobs.push(newJob);
    this.writeJobsToFile(jobs);

    // Adding the job to the queue
    await this.jobsQueue.add(
      'process-job',
      {
        jobId: newJob.jobId,
        createdAt: new Date(),
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );

    return newJob.jobId;
  }

  async getJobStatus(jobId: string): Promise<JobData | null> {
    const jobs = this.readJobsFromFile();
    return jobs.find((job) => job.jobId === jobId) || null;
  }

  async getAllJobs(): Promise<JobData[]> {
    const jobs = this.readJobsFromFile();
    return jobs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async pendingJobsCount(): Promise<number | null> {
    const waitingCount = await this.jobsQueue.getWaitingCount();
    const activeCount = await this.jobsQueue.getActiveCount();

    return waitingCount + activeCount;
  }

  private generateJobId(): string {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16),
    );
  }

  //crone job for updating the status of pending failed jobs
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Checking failed jobs...');

    try {
      // Get all failed jobs
      const failedJobs = await this.jobsQueue.getFailed();

      const fileData = this.readJobsFromFile();

      for (const job of failedJobs) {
        const jobData = fileData.find((j) => j.jobId === job.data.jobId);

        if (jobData && jobData.status === 'PENDING') {
          jobData.status = 'FAILED';
          jobData.resolvedAt = new Date();
          jobData.result = null;

          this.writeJobsToFile(fileData);
          this.logger.debug(`Updated job ${job.id} status to failed.`);
        }
      }
    } catch (error) {
      this.logger.error('Error updating job statuses:', error);
    }
  }
}
