import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { TaskLoggerModule } from './task-logger/task-logger.module';
const loggerLabelProvider = { provide: 'LoggerLabelToken', useValue: 'AppModule' };

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
    TaskLoggerModule,
  ],
  controllers: [],
  providers: [loggerLabelProvider],
  exports: [loggerLabelProvider],
})
export class AppModule {}
