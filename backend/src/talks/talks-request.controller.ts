import { Controller, Post, Body, Ip, HttpException, HttpStatus } from '@nestjs/common';
import { TalkRequestService } from './talks-request.service';
import { CreateTalkRequestDto } from './dto/create-talk-request.dto';
import { SpamProtectionService } from '../spam-protection/spam-protection.service';

@Controller('talk-requests')
export class TalkRequestController {
  constructor(
    private readonly talkRequestService: TalkRequestService,
    private readonly spamProtectionService: SpamProtectionService,
  ) {}

  @Post()
  async create(@Body() createTalkRequestDto: CreateTalkRequestDto, @Ip() ipAddress: string) {
    // Проверка на спам
    const isSpam = await this.spamProtectionService.isSpam(createTalkRequestDto, ipAddress);
    if (isSpam) {
      throw new HttpException(
        'Слишком много заявок. Пожалуйста, попробуйте позже.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return this.talkRequestService.create(createTalkRequestDto, ipAddress);
  }
} 