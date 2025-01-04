import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  isPublish: boolean;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  company?: string;
  @ApiProperty()
  address?: string;
  @ApiProperty()
  registrationLink?: string;
  @ApiProperty()
  streamLink?: string;
  @ApiProperty()
  videosLink?: string;
  @ApiProperty()
  talks: number[];
}
