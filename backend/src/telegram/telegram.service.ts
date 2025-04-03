import { Injectable } from '@nestjs/common';
import { TalkRequest } from '../talks/entities/talk-request.entity';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private readonly chatId: string;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    this.chatId = process.env.TELEGRAM_CHAT_ID;
    if (!this.chatId) {
      throw new Error('TELEGRAM_CHAT_ID is not set');
    }

    this.bot = new TelegramBot(token, { polling: false });
  }

  async sendTalkRequest(request: TalkRequest): Promise<void> {
    const message = this.formatTalkRequest(request);
    await this.bot.sendMessage(this.chatId, message, { parse_mode: 'HTML' });
  }

  private formatTalkRequest(request: TalkRequest): string {
    return `
🎤 <b>Новая заявка на доклад!</b>

👤 <b>Спикер:</b> ${request.fullName}
📧 <b>Email:</b> ${request.email}
🏢 <b>Компания:</b> ${request.company}

📝 <b>Тема:</b> ${request.title}

📄 <b>Описание:</b>
${request.description}

🕒 <b>Дата заявки:</b> ${request.createdAt.toLocaleString('ru-RU')}
    `.trim();
  }
} 