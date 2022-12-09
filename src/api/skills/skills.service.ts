import { Injectable } from '@nestjs/common';
import { SkillsRepository } from './skills.repository';
import { Skill, Skills } from './schemas/skills.schemata';
import { CreateSkillDto } from './dto';

@Injectable()
export class SkillsService {
  constructor(private _repository: SkillsRepository) {}

  create(createSkill: CreateSkillDto): Promise<Skill> {
    return this._repository.create(createSkill);
  }

  getAll(): Promise<Skills> {
    return this._repository.getAll();
  }

  getById(id: string): Promise<Skill> {
    return this._repository.getById(id);
  }
}
