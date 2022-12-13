import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Stack, StacksModule } from "./api/stacks";
import { StackTechnology } from "./api/stacks/technologies";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "secret",
      database: "mystack",
      entities: [Stack, StackTechnology],
      synchronize: true,
    }),
    StacksModule,
  ],
})
export class AppModule {}
