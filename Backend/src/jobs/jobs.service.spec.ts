import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { Queue } from 'bull';
import * as fs from 'fs';

jest.mock('fs');

describe('JobsService', () => {
  let service: JobsService;
  let jobsQueue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: 'BullQueue_jobs',
          useValue: {
            add: jest.fn(),
            getWaitingCount: jest.fn().mockResolvedValue(5),
            getActiveCount: jest.fn().mockResolvedValue(3),
            getFailed: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    jobsQueue = module.get<Queue>('BullQueue_jobs');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new job and return its ID', async () => {
    const jobsMock = [];
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(jobsMock),
    );

    const jobId = await service.addJob();

    expect(jobId).toBeDefined();
    expect(jobsQueue.add).toHaveBeenCalledWith(
      'process-job',
      expect.objectContaining({ jobId }),
      expect.objectContaining({
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      }),
    );
  });

  it('should return all jobs from file', async () => {
    const jobsMock = [{ jobId: '123', status: 'PENDING' }];
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(jobsMock),
    );

    const jobs = await service.getAllJobs();

    expect(jobs).toEqual(jobsMock);
  });

  it('should return the correct count of pending jobs', async () => {
    const count = await service.pendingJobsCount();
    expect(count).toBe(8);
  });

  it('should handle failed jobs correctly in cron job', async () => {
    const failedJobsMock = [
      {
        data: { jobId: '123' },
      },
    ];
    const jobsMock = [{ jobId: '123', status: 'PENDING' }];

    (fs.readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(jobsMock),
    );

    (jobsQueue.getFailed as jest.Mock).mockResolvedValueOnce(failedJobsMock);

    (fs.writeFileSync as jest.Mock).mockImplementation(
      (filePath: string, data: string) => {
        const updatedJobs = JSON.parse(data);
        expect(updatedJobs.find((job) => job.jobId === '123')?.status).toBe(
          'FAILED',
        );
      },
    );

    await service.handleCron();

    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
