import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { JobData } from "./jobs.interface";

@Processor("jobs")
export class JobsProcessor {
  private readonly jobsFilePath = path.join(__dirname, "../../jobs.json");

  @Process("process-job")
  async handleJob(job: Job<{ jobId: string }>) {
    const { jobId } = job.data;
    try {
      console.log(`Processing job ${jobId}`);
      // const delay = (Math.floor(Math.random() * 60) + 1) * 5000; // Minimum delay 5s and maximum delay 5mins
      const delay = (Math.floor(Math.random() * 60) + 1) * 1000; // Minimum delay 1s and maximum delay 1 min

      await new Promise((resolve) => setTimeout(resolve, delay));

      const imageResponse = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            client_id: "",
            query: "food",
          },
        }
      );

      console.log("Unsplash API response:", imageResponse.data);

      const image = imageResponse.data?.urls?.raw;
      if (!image) {
        throw new Error("Incomplete image data returned from Unsplash");
      }

      const result: JobData = {
        jobId,
        resolvedAt: new Date(),
        status: "completed",
        result: {
          id: imageResponse.data.id,
          slug: imageResponse.data.slug || "",
          urls: image,
        },
      };

      // Updating the job status in file
      this.updateJobStatus(result);
      console.log(`Job ${jobId} completed successfully`);
      job.moveToCompleted(); //Marking the job as completed
    } catch (error) {
      console.error(`Error processing job ${jobId}:`, error.message);
      const failedResult: JobData = {
        jobId,
        createdAt: new Date(),
        resolvedAt: new Date(),
        status: "failed",
        result: null,
      };

      this.updateJobStatus(failedResult);
      await job.moveToFailed(
        { message: "Hook marked as failed because of missing data" },
        false
      );
    }
  }

  private updateJobStatus(updatedJob: JobData) {
    try {
      const jobs = JSON.parse(
        fs.readFileSync(this.jobsFilePath, "utf-8")
      ) as JobData[];
      const jobIndex = jobs.findIndex((job) => job.jobId === updatedJob.jobId);
      if (jobIndex !== -1) {
        jobs[jobIndex] = updatedJob;
        fs.writeFileSync(this.jobsFilePath, JSON.stringify(jobs, null, 2));
      }
    } catch (error) {
      console.error("Error updating job status in file:", error.message);
    }
  }
}
