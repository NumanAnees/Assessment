import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JobsModule } from "./jobs/jobs.module";
import { BullModule } from "@nestjs/bull";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: "jobs",
      // processors: [
      //   {
      //     concurrency: 5,
      //     path: path.join(__dirname, "jobs", "jobs.processor.js"),
      //   },
      // ],
      defaultJobOptions: {
        timeout: 100000,
      },
    }),
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
