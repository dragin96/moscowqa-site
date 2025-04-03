import { Event } from '../events/entities/event.entity';
import { Speaker } from '../speakers/entities/speaker.entity';
import { Talk } from '../talks/entities/talk.entity';
import { AdminUser } from '../auth/admin.auth';
import { EventResourceOptions } from '../events/event.resource';
import { SpeakerResourceOptions } from '../speakers/speaker.resource';
import { TalkResourceOptions } from '../talks/talk.resource';

export interface AdminConfig {
  rootPath: string;
  resources: {
    resource: typeof Event | typeof Speaker | typeof Talk;
    options?: any;
  }[];
  auth: {
    authenticate: (email: string, password: string) => Promise<AdminUser | null>;
    cookieName: string;
    cookiePassword: string;
  };
  sessionOptions: {
    resave: boolean;
    saveUninitialized: boolean;
    secret: string;
  };
}

export const getAdminConfig = (
  authenticate: (email: string, password: string) => Promise<AdminUser | null>,
): AdminConfig => ({
  rootPath: '/admin',
  resources: [
    { resource: Event, ...EventResourceOptions },
    { 
      resource: Speaker, 
      ...SpeakerResourceOptions,
      options: {
        ...SpeakerResourceOptions.options,
        resource: Speaker,
      },
    },
    { 
      resource: Talk, 
      ...TalkResourceOptions,
      options: {
        ...TalkResourceOptions.options,
        resource: Talk,
      },
    },
  ],
  auth: {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: process.env.COOKIE_SECRET || 'secret',
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'secret',
  },
}); 