import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakersService } from './speakers.service';
import { SpeakersController } from './speakers.controller';
import { Speaker } from './entities/speaker.entity';
import { Talk } from '../talks/entities/talk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker, Talk])],
  controllers: [SpeakersController],
  providers: [SpeakersService],
})
export class SpeakersModule {}
