import { ApiProperty } from "@nestjs/swagger";

export class UpdateStackDto {
  @ApiProperty({
    description: "Id",
    type: Number,
  })
  readonly id: number;

  @ApiProperty({
    description: "Title",
    type: String,
  })
  readonly title: string;
}
