import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import type { StackTechnology } from "./technologies";

@Entity({ name: "stacks" })
export class Stack {
  @ApiProperty({
    description: "Id",
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Title",
    type: String,
  })
  @Column({ length: 256 })
  title: string;

  @OneToMany("StackTechnology", "stack", {
    eager: true,
  })
  technologies: StackTechnology[];
}
