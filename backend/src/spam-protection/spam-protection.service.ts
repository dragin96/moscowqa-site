import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { TalkRequest } from '../talks/entities/talk-request.entity';
import { CreateTalkRequestDto } from '../talks/dto/create-talk-request.dto';

@Injectable()
export class SpamProtectionService {
  private readonly MAX_REQUESTS_PER_EMAIL = 3;
  private readonly MAX_REQUESTS_PER_IP = 5;
  private readonly TIME_WINDOW_HOURS = 24;
  private readonly SPAM_KEYWORDS = [
    'casino',
    'viagra',
    'lottery',
    'bitcoin',
    'crypto',
    'investment opportunity',
  ];

  constructor(
    @InjectRepository(TalkRequest)
    private talkRequestRepository: Repository<TalkRequest>,
  ) {}

  async isSpam(dto: CreateTalkRequestDto, ipAddress: string): Promise<boolean> {
    const [emailCount, ipCount, spamScore] = await Promise.all([
      this.checkEmailLimit(dto.email),
      this.checkIpLimit(ipAddress),
      this.calculateSpamScore(dto),
    ]);

    return emailCount || ipCount || spamScore >= 2;
  }

  private async checkEmailLimit(email: string): Promise<boolean> {
    const timeThreshold = new Date();
    timeThreshold.setHours(timeThreshold.getHours() - this.TIME_WINDOW_HOURS);

    const count = await this.talkRequestRepository.count({
      where: {
        email,
        createdAt: MoreThan(timeThreshold),
      },
    });

    return count >= this.MAX_REQUESTS_PER_EMAIL;
  }

  private async checkIpLimit(ipAddress: string): Promise<boolean> {
    const timeThreshold = new Date();
    timeThreshold.setHours(timeThreshold.getHours() - this.TIME_WINDOW_HOURS);

    const count = await this.talkRequestRepository.count({
      where: {
        ipAddress,
        createdAt: MoreThan(timeThreshold),
      },
    });

    return count >= this.MAX_REQUESTS_PER_IP;
  }

  private calculateSpamScore(dto: CreateTalkRequestDto): number {
    let score = 0;

    // Проверка на спам-слова
    const content = `${dto.title} ${dto.description}`.toLowerCase();
    for (const keyword of this.SPAM_KEYWORDS) {
      if (content.includes(keyword)) {
        score += 1;
      }
    }

    // Проверка на избыточные заглавные буквы
    const upperCaseRatio = (dto.description.match(/[A-Z]/g) || []).length / dto.description.length;
    if (upperCaseRatio > 0.5) {
      score += 1;
    }

    // Проверка на повторяющиеся символы
    if (/(.)\1{4,}/.test(content)) {
      score += 1;
    }

    return score;
  }
} 