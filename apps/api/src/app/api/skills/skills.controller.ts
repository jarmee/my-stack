import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSkillDto } from './dto';
import { Skill, Skills } from './schemas';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private _service: SkillsService) {}

  @Post()
  create(@Body() createSkill: CreateSkillDto): Promise<Skill> {
    return this._service.create(createSkill);
  }

  @Get()
  getAll(): Promise<Skills> {
    return this._service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Skill> {
    return this._service.getById(id);
  }
}
