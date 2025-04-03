import { Module } from '@nestjs/common';
import { TalkResourceOptions } from '../talks/talk.resource';
import { SpeakerResourceOptions } from '../speakers/speaker.resource';
import { EventResourceOptions } from '../events/event.resource';

@Module({
  imports: [
    import('@adminjs/nestjs').then(({ AdminModule }) => 
      AdminModule.createAdmin({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            TalkResourceOptions,
            SpeakerResourceOptions,
            EventResourceOptions,
          ],
          branding: {
            companyName: 'Moscow QA',
            logo: false,
            favicon: '/favicon.ico',
          },
          locale: {
            language: 'ru',
            translations: {
              labels: {
                Talk: 'Доклад',
                Speaker: 'Спикер',
                Event: 'Событие',
              },
            },
          },
        },
      })
    ),
  ],
})
export class AdminModule {} 