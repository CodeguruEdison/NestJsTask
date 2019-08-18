import { Controller, Get, Body, Post, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
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
}
