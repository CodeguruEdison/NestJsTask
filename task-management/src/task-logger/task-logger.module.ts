import { Module} from '@nestjs/common';
import { TaskLogger } from './task-logger';

@Module({
    providers : [TaskLogger],
    exports : [TaskLogger],
})
export class  TaskLoggerModule  {}
