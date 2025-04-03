import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeakerDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  photo?: string;
  @ApiProperty()
  company?: string;
  @ApiProperty()
  bio?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  telegram?: string;
  @ApiProperty()
  github?: string;
  @ApiProperty({ type: [Number], required: false })
  talkIds?: number[];
}
