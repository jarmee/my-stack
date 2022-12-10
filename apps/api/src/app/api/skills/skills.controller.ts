import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";

import { CreateSkillDto } from "./create-skill.dto";
import { Skill } from "./skill.entity";
import { SkillsService } from "./skills.service";

@ApiTags("skills")
@Controller("skills")
export class SkillsController {
  constructor(private _service: SkillsService) {}

  @Post()
  @ApiResponse({ status: 200, type: Skill })
  create(@Body() createSkill: CreateSkillDto): Promise<Skill> {
    return this._service.create(createSkill);
  }

  @Get()
  @ApiResponse({ status: 200, type: Array<Skill> })
  getAll(): Promise<Array<Skill>> {
    return this._service.getAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: Skill })
  getById(@Param("id") id: number): Promise<Skill> {
    return this._service.getById(id);
  }
}
