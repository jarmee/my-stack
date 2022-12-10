import { ApiProperty } from "@nestjs/swagger";

export class CreateSkillDto {
  @ApiProperty({
    description: "Title",
    type: String,
  })
  readonly title: string;
}
