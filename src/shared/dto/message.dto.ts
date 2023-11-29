import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {

  @ApiProperty()
  readonly title?: string;

  @ApiProperty()
  readonly message?: string;

  constructor(x: Partial<MessageDto>) {
    Object.assign(this, x)
  }
}