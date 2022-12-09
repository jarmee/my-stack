import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CastError, Model } from 'mongoose';
import { CreateSkillDto } from './dto';
import { Skill, SkillDocument, Skills } from './schemas';

@Injectable()
export class SkillsRepository {
  constructor(@InjectModel(Skill.name) private _model: Model<SkillDocument>) {}

  async create(createSkill: CreateSkillDto): Promise<Skill> {
    const createdSkill = await this._model.create(createSkill);
    return createdSkill;
  }

  getAll(): Promise<Skills> {
    return this._model.find().exec();
  }

  getById(id: string): Promise<Skill> {
    return this._model.findOne({ _id: id }).exec();
  }
}
