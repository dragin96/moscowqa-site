import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './entities/speaker.entity';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { Talk } from '../talks/entities/talk.entity';

@Injectable()
export class SpeakersService {
  constructor(
    @InjectRepository(Speaker)
    private speakersRepository: Repository<Speaker>,
    @InjectRepository(Talk)
    private talksRepository: Repository<Talk>,
  ) {}

  async create(createSpeakerDto: CreateSpeakerDto) {
    const { talkIds, ...data } = createSpeakerDto;
    const speaker = this.speakersRepository.create(data);
    
    if (talkIds) {
      const talks = await this.talksRepository.findByIds(talkIds);
      speaker.talks = talks;
    }
    
    return this.speakersRepository.save(speaker);
  }

  findAll() {
    return this.speakersRepository.find({ relations: ['talks'] });
  }

  findOne(id: number) {
    return this.speakersRepository.findOne({
      where: { id },
      relations: ['talks'],
    });
  }

  async update(id: number, updateSpeakerDto: UpdateSpeakerDto) {
    const { talkIds, ...data } = updateSpeakerDto;
    const speaker = await this.speakersRepository.findOne({
      where: { id },
      relations: ['talks'],
    });

    if (speaker) {
      if (talkIds) {
        const talks = await this.talksRepository.findByIds(talkIds);
        speaker.talks = talks;
      }
      Object.assign(speaker, data);
      return this.speakersRepository.save(speaker);
    }

    return this.speakersRepository.update(id, data);
  }

  remove(id: number) {
    return this.speakersRepository.delete(id);
  }
}
