import { Controller, Get, Body, Post, Param, Delete, Put, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {

    }
    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
       // console.log(filterDto);
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        }
        return this.taskService.getAllTasks();
    }
    @Post()
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
    updateTaskById(@Param('id') id: string, @Body('status') status: TaskStatus ): Task {
       return this.taskService.updateTaskById(id, status);
    }

}
