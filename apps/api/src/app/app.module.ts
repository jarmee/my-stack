import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Skill, SkillsModule } from "./api/skills";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "secret",
      database: "mystack",
      entities: [Skill],
      synchronize: true,
    }),
    SkillsModule,
  ],
})
export class AppModule {}
