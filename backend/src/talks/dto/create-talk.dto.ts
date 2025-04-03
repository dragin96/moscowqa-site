import { ApiProperty } from '@nestjs/swagger';

export class CreateTalkDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false })
  abstract?: string;
  @ApiProperty({ required: false })
  preview?: string;
  @ApiProperty({ required: false })
  videoLink?: string;
  @ApiProperty()
  slidesLink?: string;
  @ApiProperty()
  materialsLink?: string;
  @ApiProperty({ type: [Number], required: false })
  speakerIds?: number[];
  @ApiProperty()
  eventId: number;
}
