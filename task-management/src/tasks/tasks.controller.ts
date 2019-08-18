import { Controller, Get, Body, Post, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {

    }
    @Get()
    getAllTask(): Task[] {
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
    @Put('/:id')
    updateTaskById(@Param('id') id: string, @Body('status') status: string ) {
       return this.taskService.updateTaskById(id, TaskStatus[status]);
    }
}
