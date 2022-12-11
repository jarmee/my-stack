import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";

import { Skill as SkillEntity } from "../app/api/skills";

export const Skill = Factory.makeFactory<Omit<SkillEntity, "id">>({
  title: Factory.each(() => faker.word.noun()),
});
