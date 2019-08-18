import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    constructor() {}
   getAllTasks(): Task[] {
       return this.tasks;
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
       return this.tasks.find(t => t.id === id);
   }
   deleteTaskById(id: string): void {
     this.tasks = this.tasks.filter(t => t.id !== id);
   }
   updateTaskById(id: string, taskStatus: TaskStatus): Task {
       const filteredTask = this.tasks.find(t => t.id === id );
       if (filteredTask !== null ) {
          filteredTask.status = taskStatus;
          this.tasks = [...this.tasks, filteredTask];
          return filteredTask;
       }
   }
}
