import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { QueryExpressionMap } from 'typeorm/query-builder/QueryExpressionMap';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    /**
     *
     */
    constructor() {
        super();
        
    }
  private logger = new Logger('Task Repostiry');
    async createTask(createTaskDto: CreateTaskDto,
                     user: User): Promise<Task> {
        const {title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        try {
            await task.save();
        } catch (error) {
            this.logger.error(`failed to create for user "${user.username}"`, error.stack);
            throw new InternalServerErrorException();
        }
        delete task.user;

        return task;
    }
    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        query.where('task.userid =:userId', {userId: user.id});
        if (status) {
           query.andWhere('task.status =:status', {status});
         }
        if (search) {
           query.andWhere('(LOWER(task.status)  LIKE :search  OR LOWER(task.description) LIKE :search)', {search: `%${search.toLowerCase()}%`});
         }
        try {
            const tasks = await query.getMany();
            return tasks;
         } catch (error) {
             this.logger.error(`failed to get for user "${user.username}"`, error.stack);
             throw new InternalServerErrorException();
         }

    }

}
