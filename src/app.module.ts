import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SpeakersModule } from './speakers/speakers.module';
import { EventsModule } from './events/events.module';
import { TalksModule } from './talks/talks.module';
import { DatabaseModule } from './database/database.module';
import { Event } from './events/entities/event.entity';
import { Speaker } from './speakers/entities/speaker.entity';
import { Talk } from './talks/entities/talk.entity';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
dotenv.config();

const DEFAULT_ADMIN = {
  email: process.env.DEFAULT_ADMIN_NAME,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
};

(async () => {
  const AdminJS = (await import('adminjs')).default;
  const AdminJSTypeorm = await import('@adminjs/typeorm');

  AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
  });
})();

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    SpeakersModule,
    EventsModule,
    TalksModule,
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [Event, Speaker, Talk],
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }),
      }),
    ),
  ],
})
export class AppModule {}
