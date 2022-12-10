import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateSkillDto } from "./create-skill.dto";
import { Skill } from "./skill.entity";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private _repository: Repository<Skill>
  ) {}

  create(createSkill: CreateSkillDto): Promise<Skill> {
    const skill = new Skill();
    skill.title = createSkill.title;

    return this._repository.save(skill);
  }

  getAll(): Promise<Array<Skill>> {
    return this._repository.find();
  }

  getById(id: number): Promise<Skill> {
    return this._repository.findOneBy({ id: id });
  }
}
