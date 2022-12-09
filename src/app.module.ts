import { Module } from '@nestjs/common';
import { SkillsModule } from './api/skills';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [SkillsModule, MongooseModule.forRoot('mongodb://localhost/')],
})
export class AppModule {}
