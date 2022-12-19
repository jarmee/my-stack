import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { Stack as StackEntity } from '../app/api/stacks';

export const Stack = Factory.makeFactory<Omit<StackEntity, 'id'>>({
  title: Factory.each(() => faker.word.noun()),
  technologies: [],
});
