import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill {
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
  @Column()
  title: string;
}
