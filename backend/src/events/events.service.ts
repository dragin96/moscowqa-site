import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Talk } from '../talks/entities/talk.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Talk)
    private talksRepository: Repository<Talk>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const { talks: talkIds, ...eventData } = createEventDto;

    // Найти связанные сущности Talk
    const talks = await this.talksRepository.findByIds(talkIds);

    // Создать новый Event
    const event = this.eventsRepository.create({
      ...eventData,
      talks,
    });

    return this.eventsRepository.save(event);
  }

  findAll() {
    return this.eventsRepository.find({ 
      relations: ['talks', 'talks.speakers'],
      order: {
        date: 'DESC'
      }
    });
  }

  findOne(id: number) {
    return this.eventsRepository.findOne({
      where: { id },
      relations: ['talks', 'talks.speakers'],
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const { talks: talkIds, ...eventData } = updateEventDto;

    // Найти связанные сущности Talk
    const talks = talkIds
      ? await this.talksRepository.findByIds(talkIds)
      : undefined;

    // Обновить Event
    return this.eventsRepository.update(id, {
      ...eventData,
      ...(talks && { talks }),
    });
  }

  remove(id: number) {
    return this.eventsRepository.delete(id);
  }
}
