import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

describe('JobsController', () => {
  let controller: JobsController;
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: {
            getAllJobs: jest.fn().mockResolvedValue([]),
            addJob: jest.fn().mockResolvedValue('jobId-123'),
            pendingJobsCount: jest.fn().mockResolvedValue(5),
            getJobStatus: jest
              .fn()
              .mockResolvedValue({ jobId: '1', status: 'PENDING' }),
          },
        },
      ],
    }).compile();

    controller = module.get<JobsController>(JobsController);
    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all jobs', async () => {
    const result = await controller.getAllJobs();
    expect(result).toEqual([]);
  });

  it('should create a new job and return jobId', async () => {
    const result = await controller.createJob();
    expect(result).toEqual({ jobId: 'jobId-123' });
  });

  it('should return pending jobs count', async () => {
    const result = await controller.pendingJobsCount();
    expect(result).toEqual(5);
  });

  it('should return job status by id', async () => {
    const result = await controller.getJobStatus('1');
    expect(result).toEqual({ jobId: '1', status: 'PENDING' });
  });
});
