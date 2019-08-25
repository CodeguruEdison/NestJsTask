import { Injectable, NotFoundException } from '@nestjs/common';

// import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  constructor( @InjectRepository(TaskRepository) private taskRepository: TaskRepository) {

  }
  async getTaskById(id: number, user: User): Promise<Task> {
    const found =  await this.taskRepository.findOne({ where: {id, userId: user.id}});
    if (!found) {
        throw new  NotFoundException(`Task with ID ${id} not found.`);
    }
    return found;
 }
 async createTask(createTaskDto: CreateTaskDto,
                  user: User): Promise<Task>  {
     return this.taskRepository.createTask(createTaskDto, user);
 }
 async deleteTaskById(id: number, user: User): Promise<void> {
   const result = await this.taskRepository.delete({id, userId: user.id});
   if (result.affected === 0) {
     throw new  NotFoundException(`Task with ID ${id} not found.`);
    }
  // console.log(result);
}
async updateTaskById(id: number, taskStatus: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = taskStatus;
    await task.save();
    return task;
    
}
getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
 return this.taskRepository.getTasks(filterDto, user);
}
   /*  getAllTasks(): Task[] {
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

   updateTaskById(id: string, taskStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
      // const filteredTask = this.tasks.find(t => t.id === id );
    if (task !== null ) {
        task.status = taskStatus;
        this.tasks = [...this.tasks, task];
        return task;
       }
   }
   */
}
