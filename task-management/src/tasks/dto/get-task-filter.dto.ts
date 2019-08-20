import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTaskFilterDto {
    @IsOptional() 
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}
//entities: [__dirname + '/../**/*.entity.{js,ts}']
//http://127.0.0.1:60319/browser/