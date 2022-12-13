import { ApiProperty } from "@nestjs/swagger";

export class CreateStackTechnologyDto {
  @ApiProperty({
    description: "Title",
    type: String,
  })
  readonly title: string;
}
