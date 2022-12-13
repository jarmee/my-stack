import { ApiProperty } from "@nestjs/swagger";

export class CreateStackDto {
  @ApiProperty({
    description: "Title",
    type: String,
  })
  readonly title: string;
}
