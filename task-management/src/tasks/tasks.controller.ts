import { Controller, Get, Body, Post, Param, Delete, Put, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { TaskLogger } from '../task-logger/task-logger';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private readonly taskService: TasksService,
                private readonly logger: TaskLogger<'TasksController'> ) {

    }
@Get('/:id')
getTaskById(@Param('id', ParseIntPipe)id: number,
            @GetUser() user: User ): Promise < Task > {

       // this.logger.log(this.logger);
        this.logger.log(`Param id ${id}`);
        return this.taskService.getTaskById(id, user);
    }
@Post()
    @UsePipes(ValidationPipe)
createTask( @Body() createTaskDto: CreateTaskDto,
            @GetUser()user: User ): Promise < Task > {
        return this.taskService.createTask(createTaskDto, user);
    }
@Delete('/:id')
deleteByTaskId( @Param('id', ParseIntPipe) id: number,
                @GetUser()user: User ): Promise < void > {
        return this.taskService.deleteTaskById(id, user);
    }
@Patch('/:id/status')
updateTaskById(@Param('id', ParseIntPipe) id: number,
               @Body('status', TaskStatusValidationPipe) status: TaskStatus
                   , @GetUser()user: User): Promise < Task > {
       return this.taskService.updateTaskById(id, status, user);
    }
@Get()
getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto,
         @GetUser() user: User ) {
       // console.log(filterDto);
       return this.taskService.getTasks(filterDto, user);
    }

}
