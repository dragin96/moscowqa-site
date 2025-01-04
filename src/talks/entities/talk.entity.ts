import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Speaker } from '../../speakers/entities/speaker.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('talks')
export class Talk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  abstract: string;

  @Column({ nullable: true })
  videoLink: string;

  @Column({ nullable: true })
  slidesLink: string;

  @Column({ nullable: true })
  materialsLink: string;

  @ManyToMany(() => Speaker, (speaker) => speaker.talks)
  @JoinTable({
    name: 'talk_speakers', // Имя промежуточной таблицы
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

  @ManyToOne(() => Event, (event) => event.talks)
  event: Event;
}
