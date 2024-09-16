import { Controller, Post, Get, Param } from "@nestjs/common";
import { JobsService } from "./jobs.service";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async createJob() {
    const jobId = await this.jobsService.addJob();
    return { jobId };
  }

  @Get(":id")
  async getJobStatus(@Param("id") id: string) {
    const jobStatus = await this.jobsService.getJobStatus(id);
    if (!jobStatus) {
      return { status: "Job not found" };
    }
    return jobStatus;
  }

  @Get()
  async getAllJobs() {
    const jobs = await this.jobsService.getAllJobs();
    return jobs;
  }
}
