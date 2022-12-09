import { Module } from '@nestjs/common';
import { SkillsModule } from './api/skills';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [SkillsModule, MongooseModule.forRoot('mongodb://localhost/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
