import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;

@Schema()
export class Skill {
  @Prop()
  title: string;
}

export type Skills = Array<Skill>;

export const SkillSchema = SchemaFactory.createForClass(Skill);
