import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { API } from "../../constants";
import { CreateSkillDto } from "./create-skill.dto";
import { Skill } from "./skill.entity";
import { SkillsService } from "./skills.service";

@ApiTags(API.ENDPOINTS.SKILLS)
@Controller(API.ENDPOINTS.SKILLS)
export class SkillsController {
  constructor(private _service: SkillsService) {}

  @Post()
  @ApiOperation({ operationId: "createSkill", description: "creates a skill" })
  @ApiResponse({
    status: 200,
    type: Skill,
  })
  create(@Body() createSkill: CreateSkillDto): Promise<Skill> {
    return this._service.create(createSkill);
  }

  @Get()
  @ApiOperation({
    operationId: "getAllSkills",
    description: "returns all skills",
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Skill,
  })
  getAll(): Promise<Array<Skill>> {
    return this._service.getAll();
  }

  @Get(":id")
  @ApiOperation({
    operationId: "getSkillById",
  })
  @ApiResponse({
    status: 200,
    type: Skill,
  })
  getById(@Param("id") id: number): Promise<Skill> {
    return this._service.getById(id);
  }
}
