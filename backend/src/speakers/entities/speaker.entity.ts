import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Talk } from '../../talks/entities/talk.entity';

@Entity('speakers')
export class Speaker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  company: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telegram: string;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  position: string;

  @Column({ type: 'jsonb', nullable: true })
  socialLinks: Record<string, string>;

  @ManyToMany(() => Talk, talk => talk.speakers)
  @JoinTable({
    name: 'talk_speakers',
    joinColumn: {
      name: 'speaker_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'talk_id',
      referencedColumnName: 'id',
    },
  })
  talks: Talk[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
