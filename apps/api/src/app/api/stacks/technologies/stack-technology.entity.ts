import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { Stack } from '../stack.entity';

@Entity({ name: 'technologies' })
export class StackTechnology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  title: string;

  @ManyToOne('Stack', 'technologies')
  stack: Stack;
}
