import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import type { Stack } from "../stack.entity";

@Entity({ name: "technologies" })
export class StackTechnology {
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

  @ManyToOne("Stack", "technologies")
  stack: Stack;
}
