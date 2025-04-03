import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { Talk } from '../talks/entities/talk.entity';
import { Speaker } from '../speakers/entities/speaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Talk, Speaker])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
