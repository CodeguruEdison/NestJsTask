import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';
import { TaskLoggerModule } from '../task-logger/task-logger.module';
import { TaskLogger } from '../task-logger/task-logger';
const loggerLabelProvider = { provide: 'LoggerLabelToken', useValue: 'TasksModule' };

@Module({
  imports : [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
    TaskLoggerModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskLogger, loggerLabelProvider],
})
export class TasksModule {}
