import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { TaskLogger } from './task-logger/task-logger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(TaskLogger));
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
