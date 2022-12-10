import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { CreateSkillDto } from "./dto";
import { Skill } from "./skill.entity";
import { SkillsService } from "./skills.service";

@Controller("skills")
export class SkillsController {
  constructor(private _service: SkillsService) {}

  @Post()
  create(@Body() createSkill: CreateSkillDto): Promise<Skill> {
    return this._service.create(createSkill);
  }

  @Get()
  getAll(): Promise<Array<Skill>> {
    return this._service.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: number): Promise<Skill> {
    return this._service.getById(id);
  }
}
