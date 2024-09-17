import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsProcessor } from './jobs.processor';
import * as path from 'path';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'jobs',
      settings: {
        stalledInterval: 30000, // Check for stalled jobs every 30 seconds
        lockDuration: 60000, // Extend lock duration to 60 seconds
      },
      // processors: [
      //   {
      //     concurrency: 5,
      //     path: path.join(__dirname, 'jobs.processor.js'),
      //   },
      // ],
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService, JobsProcessor],
})
export class JobsModule {}
