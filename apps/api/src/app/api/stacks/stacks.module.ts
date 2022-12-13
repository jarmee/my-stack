import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Stack } from "./stack.entity";
import { StacksController } from "./stacks.controller";
import { StacksService } from "./stacks.service";
import { StacksTechnologiesModule } from "./technologies";

@Module({
  imports: [TypeOrmModule.forFeature([Stack]), StacksTechnologiesModule],
  controllers: [StacksController],
  providers: [StacksService],
})
export class StacksModule {}
