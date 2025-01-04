import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Talk } from '../../talks/entities/talk.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isPublish: boolean;

  @Column()
  date: Date;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  registrationLink: string;

  @Column({ nullable: true })
  streamLink: string;

  @Column({ nullable: true })
  videosLink: string;

  @ManyToMany(() => Talk, (talk) => talk.event)
  @JoinTable()
  talks: Talk[];
}
