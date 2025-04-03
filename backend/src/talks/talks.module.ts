import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalksService } from './talks.service';
import { TalksController } from './talks.controller';
import { Talk } from './entities/talk.entity';
import { Speaker } from '../speakers/entities/speaker.entity';
import { Event } from '../events/entities/event.entity';
import { SpeakersModule } from '../speakers/speakers.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Talk, Speaker, Event]),
    SpeakersModule,
    EventsModule,
  ],
  controllers: [TalksController],
  providers: [TalksService],
})
export class TalksModule {}
