import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { TaskLogger } from './task-logger/task-logger';
import * as config from 'config';
 
async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const port = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);
  
  logger.log(serverConfig.port);
  app.useLogger(app.get(TaskLogger));
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
