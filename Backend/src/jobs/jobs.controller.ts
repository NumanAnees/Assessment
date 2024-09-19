import { Controller, Post, Get, Param } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { JobsService } from './jobs.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiOkResponse({ description: 'Jobs retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Jobs not found' })
  @SkipThrottle()
  async getAllJobs() {
    const jobs = await this.jobsService.getAllJobs();
    return jobs;
  }

  @Post()
  @ApiOkResponse({ description: 'Job created successfully' })
  @ApiNotFoundResponse({ description: 'Job cannot be created' })
  @ApiOperation({ summary: 'Create a new job' })
  async createJob() {
    const jobId = await this.jobsService.addJob();
    return { jobId };
  }

  @Get('pending')
  @ApiOkResponse({ description: 'Pending Jobs retrieved successfully' })
  @ApiNotFoundResponse({
    description: 'Pending jobs cannot be retrieved',
  })
  @ApiOperation({ summary: 'Get number of jobs in waiting or active state' })
  @SkipThrottle()
  async pendingJobsCount() {
    const jobs = await this.jobsService.pendingJobsCount();
    return jobs;
  }

  @Get(':id')
  @SkipThrottle()
  @ApiOkResponse({ description: 'Job retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Job not found' })
  @ApiOperation({ summary: 'Get single job based on id' })
  async getJobStatus(@Param('id') id: string) {
    const jobStatus = await this.jobsService.getJobStatus(id);
    if (!jobStatus) {
      return { status: 'Job not found' };
    }
    return jobStatus;
  }
}
