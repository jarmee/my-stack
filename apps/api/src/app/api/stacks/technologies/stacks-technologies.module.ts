import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Stack } from '../stack.entity';
import { StackTechnology } from './stack-technology.entity';
import { StacksTechnologiesController } from './stacks-technologies.controller';
import { StacksTechnologiesService } from './stacks-technologies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stack, StackTechnology])],
  controllers: [StacksTechnologiesController],
  providers: [StacksTechnologiesService],
})
export class StacksTechnologiesModule {}
