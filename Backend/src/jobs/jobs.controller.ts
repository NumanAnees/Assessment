import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @SkipThrottle()
  async getAllJobs() {
    const jobs = await this.jobsService.getAllJobs();
    return jobs;
  }

  @Post()
  async createJob() {
    const jobId = await this.jobsService.addJob();
    return { jobId };
  }

  @Get('pending')
  @SkipThrottle()
  async pendingJobsCount() {
    const jobs = await this.jobsService.pendingJobsCount();
    return jobs;
  }

  @Get(':id')
  @SkipThrottle()
  async getJobStatus(@Param('id') id: string) {
    const jobStatus = await this.jobsService.getJobStatus(id);
    if (!jobStatus) {
      return { status: 'Job not found' };
    }
    return jobStatus;
  }
}
