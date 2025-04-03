import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Talk } from './entities/talk.entity';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { Speaker } from '../speakers/entities/speaker.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class TalksService {
  constructor(
    @InjectRepository(Talk)
    private talksRepository: Repository<Talk>,

    @InjectRepository(Speaker)
    private speakersRepository: Repository<Speaker>,

    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createTalkDto: CreateTalkDto) {
    const { speakerIds, eventId, ...data } = createTalkDto;
    const talk = this.talksRepository.create(data);
    
    if (speakerIds) {
      const speakers = await this.speakersRepository.findByIds(speakerIds);
      talk.speakers = speakers;
    }
    
    if (eventId) {
      const event = await this.eventsRepository.findOne({
        where: { id: eventId },
      });
      if (event) {
        talk.event = event;
      }
    }
    
    return this.talksRepository.save(talk);
  }

  findAll() {
    return this.talksRepository.find({ relations: ['speakers', 'event'] });
  }

  findOne(id: number) {
    return this.talksRepository.findOne({
      where: { id },
      relations: ['speakers', 'event'],
    });
  }

  async update(id: number, updateTalkDto: UpdateTalkDto) {
    const { speakerIds, eventId, ...data } = updateTalkDto;
    const talk = await this.talksRepository.findOne({
      where: { id },
      relations: ['speakers', 'event'],
    });

    if (talk) {
      if (speakerIds) {
        const speakers = await this.speakersRepository.findByIds(speakerIds);
        talk.speakers = speakers;
      }
      if (eventId) {
        const event = await this.eventsRepository.findOne({
          where: { id: eventId },
        });
        if (event) {
          talk.event = event;
        }
      }
      Object.assign(talk, data);
      return this.talksRepository.save(talk);
    }

    return this.talksRepository.update(id, data);
  }

  remove(id: number) {
    return this.talksRepository.delete(id);
  }
}
