import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import * as fs from "fs";
import * as path from "path";
import { JobData } from "./jobs.interface";

@Injectable()
export class JobsService {
  private readonly jobsFilePath = path.join(__dirname, "../../jobs.json");

  constructor(@InjectQueue("jobs") private readonly jobsQueue: Queue) {}
  private readJobsFromFile(): JobData[] {
    try {
      const fileContent = fs.readFileSync(this.jobsFilePath, "utf-8");
      return fileContent ? JSON.parse(fileContent) : [];
    } catch (error) {
      console.error("Error reading jobs from file:", error.message);
      return [];
    }
  }

  private writeJobsToFile(jobs: JobData[]): void {
    try {
      fs.writeFileSync(this.jobsFilePath, JSON.stringify(jobs, null, 2));
    } catch (error) {
      console.error("Error writing jobs to file:", error.message);
    }
  }

  async addJob(): Promise<string> {
    const jobs = this.readJobsFromFile();
    const newJob: JobData = {
      jobId: this.generateJobId(),
      createdAt: new Date(),
      status: "pending",
    };
    jobs.push(newJob);
    this.writeJobsToFile(jobs);

    // Adding the job to the queue
    const addedJob = await this.jobsQueue.add("process-job", {
      jobId: newJob.jobId,
    });

    return newJob.jobId;
  }

  async getJobStatus(jobId: string): Promise<JobData | null> {
    const jobs = this.readJobsFromFile();
    return jobs.find((job) => job.jobId === jobId) || null;
  }

  async getAllJobs(): Promise<JobData[]> {
    return this.readJobsFromFile();
  }

  private generateJobId(): string {
    return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
  }
}
