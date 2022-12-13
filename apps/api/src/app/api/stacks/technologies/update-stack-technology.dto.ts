import { ApiProperty } from "@nestjs/swagger";

export class UpdateStackTechnologyDto {
  @ApiProperty({
    description: "Title",
    type: String,
  })
  readonly title: string;
}
