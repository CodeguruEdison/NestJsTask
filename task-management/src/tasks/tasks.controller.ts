import { Controller, Get, Body, Post, Param, Delete, Put, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {

    }
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe)id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteByTaskId(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    updateTaskById(@Param('id', ParseIntPipe) id: number,
                   @Body('status', TaskStatusValidationPipe) status: TaskStatus ): Promise<Task> {
       return this.taskService.updateTaskById(id, status);
    }
    /*@Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
       // console.log(filterDto);
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        }
        return this.taskService.getAllTasks();
    }
    
    @Get('/:id')
    getTaskById(@Param('id')id: string): Task {
        return this.taskService.getTaskById(id);
    }
    
   
*/
}
