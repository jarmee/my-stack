import { Module } from "@nestjs/common";
import { Skill, SkillsModule } from "./api/skills";
import { TypeOrmModule } from "@nestjs/typeorm";

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
