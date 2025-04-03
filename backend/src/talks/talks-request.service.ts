import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TalkRequest } from './entities/talk-request.entity';
import { CreateTalkRequestDto } from './dto/create-talk-request.dto';
import { TelegramService } from '../telegram/telegram.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class TalkRequestService {
  private readonly logger = new Logger(TalkRequestService.name);

  constructor(
    @InjectRepository(TalkRequest)
    private talkRequestRepository: Repository<TalkRequest>,
    private telegramService: TelegramService,
    private emailService: EmailService,
  ) {}

  async create(createTalkRequestDto: CreateTalkRequestDto, ipAddress: string): Promise<TalkRequest> {
    const talkRequest = this.talkRequestRepository.create({
      ...createTalkRequestDto,
      ipAddress,
      spamScore: 0,
      isSpam: false,
      emailSent: false,
    });

    await this.talkRequestRepository.save(talkRequest);
    
    // Отправляем уведомление в Telegram
    await this.telegramService.sendTalkRequest(talkRequest);

    // Отправляем подтверждение на email, если включено
    if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
      try {
        await this.emailService.sendConfirmation(talkRequest.email, talkRequest.fullName);
        talkRequest.emailSent = true;
        await this.talkRequestRepository.save(talkRequest);
      } catch (error) {
        this.logger.error(`Failed to send confirmation email to ${talkRequest.email}:`, error);
      }
    } else {
      this.logger.debug(`Skipping email notification for ${talkRequest.email} (notifications disabled)`);
    }
    
    return talkRequest;
  }
} 