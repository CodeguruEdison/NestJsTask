import { Logger, Inject } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';

export class  TaskLogger<T> extends Logger  {
    constructor(@Inject('LoggerLabelToken') label: string) {
       // const t= new T();

        super(`${label}`, true);
        // console.log(ctor);
       // console.log(`${ typeof( new() T) } test`);
      }
}
