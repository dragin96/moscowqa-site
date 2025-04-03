import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SpeakersModule } from './speakers/speakers.module';
import { EventsModule } from './events/events.module';
import { TalksModule } from './talks/talks.module';
import { DatabaseModule } from './database/database.module';
import * as dotenv from 'dotenv';
import { authenticate as adminAuthenticate } from './auth/admin.auth';
import { getAdminConfig } from './config/admin.config';
import { TalkRequestModule } from './talks/talks-request.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';

dotenv.config();

(async () => {
  const AdminJS = (await import('adminjs')).default;
  const AdminJSTypeorm = await import('@adminjs/typeorm');

  AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
  });
})();

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    SpeakersModule,
    EventsModule,
    TalksModule,
    TalkRequestModule,
    AdminModule,
    import('@adminjs/nestjs').then(({ AdminModule }) => 
      AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: getAdminConfig(adminAuthenticate),
        }),
      })
    ),
  ],
})
export class AppModule {}
