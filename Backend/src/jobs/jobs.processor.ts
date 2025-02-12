import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { JobData } from './jobs.interface';
import { ConfigService } from '@nestjs/config';

@Processor('jobs')
export class JobsProcessor {
  private readonly jobsFilePath = path.join(__dirname, '../../jobs.json');
  constructor(private readonly configService: ConfigService) {}

  @Process('process-job')
  async handleJob(job: Job<{ jobId: string }>) {
    const { jobId } = job.data;
    try {
      // const delay = (Math.floor(Math.random() * 60) + 1) * 5000; // Minimum delay 5s and maximum delay 5mins
      const delay = (Math.floor(Math.random() * 60) + 1) * 1000; // Minimum delay 1s and maximum delay 1 min
      const UNSPLASH_ACCESS_KEY = this.configService.get<string>(
        'UNSPLASH_ACCESS_KEY',
      );
      await new Promise((resolve) => setTimeout(resolve, delay));

      const imageResponse = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            client_id: UNSPLASH_ACCESS_KEY,
            query: 'food',
          },
        },
      );

      const image = imageResponse.data?.urls?.raw;
      if (!image) {
        throw new Error('Incomplete image data returned from Unsplash');
      }

      const result: JobData = {
        jobId,
        resolvedAt: new Date(),
        status: 'COMPLETED',
        result: {
          id: imageResponse.data.id,
          slug: imageResponse.data.slug || '',
          url: image,
        },
      };

      // Updating the job status in file
      this.updateJobStatus(result);
      job.moveToCompleted(); //Marking the job as completed
    } catch (error) {
      console.error(`Error processing job ${jobId}:`, error.message);
      const failedResult: JobData = {
        jobId,
        resolvedAt: new Date(),
        status: 'FAILED',
        result: null,
      };

      this.updateJobStatus(failedResult);
      await job.moveToFailed(
        { message: 'Hook marked as failed because of missing data' },
        false,
      );
    }
  }

  private updateJobStatus(updatedJob: JobData) {
    try {
      const jobs = JSON.parse(
        fs.readFileSync(this.jobsFilePath, 'utf-8'),
      ) as JobData[];
      const jobIndex = jobs.findIndex((job) => job.jobId === updatedJob.jobId);
      if (jobIndex !== -1) {
        const existingJob = jobs[jobIndex];
        jobs[jobIndex] = {
          ...existingJob,
          ...updatedJob,
          createdAt: existingJob.createdAt || updatedJob.createdAt,
        };
        fs.writeFileSync(this.jobsFilePath, JSON.stringify(jobs, null, 2));
      }
    } catch (error) {
      console.error('Error updating job status in file:', error.message);
    }
  }
}
