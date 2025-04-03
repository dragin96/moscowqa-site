import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkRequest } from './entities/talk-request.entity';
import { TalkRequestController } from './talks-request.controller';
import { TalkRequestService } from './talks-request.service';
import { TelegramService } from '../telegram/telegram.service';
import { SpamProtectionService } from '../spam-protection/spam-protection.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([TalkRequest])],
  controllers: [TalkRequestController],
  providers: [TalkRequestService, TelegramService, SpamProtectionService, EmailService],
})
export class TalkRequestModule {} 