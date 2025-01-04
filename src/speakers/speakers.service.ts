import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './entities/speaker.entity';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

@Injectable()
export class SpeakersService {
  constructor(
    @InjectRepository(Speaker)
    private speakersRepository: Repository<Speaker>,
  ) {}

  create(createSpeakerDto: CreateSpeakerDto) {
    const speaker = this.speakersRepository.create(createSpeakerDto);
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

  update(id: number, updateSpeakerDto: UpdateSpeakerDto) {
    return this.speakersRepository.update(id, updateSpeakerDto);
  }

  remove(id: number) {
    return this.speakersRepository.delete(id);
  }
}
