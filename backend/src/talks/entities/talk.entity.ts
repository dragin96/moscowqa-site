import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Speaker } from '../../speakers/entities/speaker.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('talks')
export class Talk extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  abstract: string;

  @Column({ nullable: true })
  preview: string;

  @Column({ nullable: true })
  videoLink: string;

  @Column({ nullable: true })
  slidesLink: string;

  @Column({ nullable: true })
  materialsLink: string;

  @ManyToMany(() => Speaker, (speaker) => speaker.talks)
  @JoinTable({
    name: 'talk_speakers',
    joinColumn: {
      name: 'talk_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'speaker_id',
      referencedColumnName: 'id',
    },
  })
  speakers: Speaker[];

  @Column({ name: 'event_id', nullable: true })
  event_id: number;

  @ManyToOne(() => Event, (event) => event.talks)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
