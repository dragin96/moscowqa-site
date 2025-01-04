import { ApiProperty } from '@nestjs/swagger';

export class CreateTalkDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  abstract?: string;
  @ApiProperty()
  videoLink?: string;
  @ApiProperty()
  slidesLink?: string;
  @ApiProperty()
  materialsLink?: string;
  @ApiProperty()
  speakerIds: number[];
  @ApiProperty()
  eventId: number;
}
