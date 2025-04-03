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
import { TalksService } from './talks.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('talks')
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post()
  create(@Body() createTalkDto: CreateTalkDto) {
    return this.talksService.create(createTalkDto);
  }

  @Get()
  findAll() {
    return this.talksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talksService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalkDto: UpdateTalkDto) {
    return this.talksService.update(+id, updateTalkDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talksService.remove(+id);
  }
}
