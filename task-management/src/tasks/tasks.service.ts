import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    constructor() {}
   getAllTasks(): Task[] {
       return this.tasks;
   }
   getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
     const {status, search} = filterDto;
     let tasks = this.getAllTasks();
     if (status) {
         tasks = tasks.filter(task => task.status === status);
      }
     if (search) {
          tasks = tasks.filter(task =>
             task.title.includes(search) ||
             task.description.includes(search),
          );
      }
     return tasks;
   }
   createTask(createTaskDto: CreateTaskDto): Task  {
      // const {title, description } = createTaskDto;

       const task: Task = {
            id: uuid(),
            title: createTaskDto.title,
            description: createTaskDto.description,
            status: TaskStatus.OPEN,
        };
       this.tasks.push(task);
       return task;
   }
   getTaskById(id: string): Task {
       const found =  this.tasks.find(t => t.id === id);
       if (!found) {
        throw new  NotFoundException(`Task with ID ${id} not found.`);
       }
       return found;
   }
   deleteTaskById(id: string): void {
       const founds = this.getTaskById(id);
       this.tasks = this.tasks.filter(t => t.id !== founds.id);
   }
   updateTaskById(id: string, taskStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
      // const filteredTask = this.tasks.find(t => t.id === id );
    if (task !== null ) {
        task.status = taskStatus;
        this.tasks = [...this.tasks, task];
        return task;
       }
   }
}
