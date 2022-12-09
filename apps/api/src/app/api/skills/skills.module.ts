import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsController } from './skills.controller';
import { SkillsRepository } from './skills.repository';
import { Skill, SkillSchema } from './schemas/skills.schemata';
import { SkillsService } from './skills.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService, SkillsRepository],
})
export class SkillsModule {}
