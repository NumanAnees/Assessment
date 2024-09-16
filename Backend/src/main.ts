import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { Queue } from "bullmq";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { FastifyAdapter as BullFastifyAdapter } from "@bull-board/fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>("CLIENT_URL");

  app.enableCors({
    origin: corsOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Calo Assessment")
    .setDescription("The API for Calo Assessment")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("openapi", app, document);

  // Setting up BullMQ queue
  const myQueue = new Queue("jobs");

  // Setting up Bull Board with Fastify
  const bullBoardServerAdapter = new BullFastifyAdapter();
  bullBoardServerAdapter.setBasePath("/admin/queues");

  const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullMQAdapter(myQueue)],
    serverAdapter: bullBoardServerAdapter,
  });

  // Register Bull Board routes in Fastify
  app.register(bullBoardServerAdapter.registerPlugin(), {
    prefix: "/admin/queues",
    basePath: "/admin/queues",
  });

  const port = 4000;
  await app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
    console.log(`Bull Board is running at http://0.0.0.0:${port}/admin/queues`);
  });
}

bootstrap();
