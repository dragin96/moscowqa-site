import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('speakers')
export class SpeakersController {
  constructor(private readonly speakersService: SpeakersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post()
  create(@Body() createSpeakerDto: CreateSpeakerDto) {
    return this.speakersService.create(createSpeakerDto);
  }

  @Get()
  findAll() {
    return this.speakersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speakersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeakerDto: UpdateSpeakerDto) {
    return this.speakersService.update(+id, updateSpeakerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speakersService.remove(+id);
  }
}
