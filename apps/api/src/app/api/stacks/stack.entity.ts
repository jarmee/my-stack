import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import type { StackTechnology } from './technologies';

@Entity({ name: 'stacks' })
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  title: string;

  @OneToMany('StackTechnology', 'stack', {
    eager: true,
  })
  technologies: StackTechnology[];
}
