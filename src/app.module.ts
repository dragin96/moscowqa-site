import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SpeakersModule } from './speakers/speakers.module';
import { EventsModule } from './events/events.module';
import { TalksModule } from './talks/talks.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    SpeakersModule,
    EventsModule,
    TalksModule,
  ],
})
export class AppModule {}
