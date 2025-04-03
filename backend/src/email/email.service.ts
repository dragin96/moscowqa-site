import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private readonly logger = new Logger(EmailService.name);
  private readonly isEnabled: boolean;

  constructor() {
    this.isEnabled = process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true';
    
    if (this.isEnabled) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    } else {
      this.logger.log('Email notifications are disabled');
    }
  }

  async sendConfirmation(email: string, name: string): Promise<void> {
    if (!this.isEnabled) {
      this.logger.debug(`Email notification skipped for ${email} (notifications disabled)`);
      return;
    }

    if (!this.transporter) {
      throw new Error('Email transport not initialized');
    }

    const message = {
      from: `"MoscowQA" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Ваша заявка на доклад получена',
      html: `
        <h2>Здравствуйте, ${name}!</h2>
        <p>Спасибо за вашу заявку на выступление на MoscowQA!</p>
        <p>Мы рассмотрим её в ближайшее время и свяжемся с вами.</p>
        <br>
        <p>С уважением,<br>Команда MoscowQA</p>
      `,
    };

    await this.transporter.sendMail(message);
    this.logger.debug(`Confirmation email sent to ${email}`);
  }
} 