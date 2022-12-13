import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";

import { StackTechnology as StackTechnologyEntity } from "../app/api/stacks/technologies";

export const StackTechnology = Factory.makeFactory<
  Omit<Omit<StackTechnologyEntity, "id">, "stack">
>({
  title: Factory.each(() => faker.word.noun()),
});
