import { Controller, Get, Body, Post, Param, Delete, Put, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {

    }
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
       // console.log(filterDto);
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        }
        return this.taskService.getAllTasks();
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }
    @Get('/:id')
    getTaskById(@Param('id')id: string): Task {
        return this.taskService.getTaskById(id);
    }
    @Delete('/:id')
    deleteByTaskId(@Param('id') id: string) {
        return this.taskService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    updateTaskById(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus ): Task {
       return this.taskService.updateTaskById(id, status);
    }

}
