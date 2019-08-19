import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {

     readonly allowedStatuses = [
         TaskStatus.OPEN,
         TaskStatus.IN_PROGRESS,
         TaskStatus.DONE,
     ];
    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if ( !this.isStatusValid(value)) {
            throw new BadRequestException(` value ${value} is not valid`);

        }
        return value;
    }
   private isStatusValid(status: any): boolean {
      const idx = this.allowedStatuses.indexOf(status);
      return idx !== -1;
   }
}