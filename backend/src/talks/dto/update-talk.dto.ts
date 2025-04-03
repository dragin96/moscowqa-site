import { CreateTalkDto } from './create-talk.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTalkDto extends PartialType(CreateTalkDto) {
  @ApiProperty({ required: false })
  abstract?: string;

  @ApiProperty({ required: false })
  preview?: string;

  @ApiProperty({ required: false })
  videoLink?: string;
}
