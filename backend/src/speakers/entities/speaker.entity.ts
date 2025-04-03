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

  @Column()
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

  @Column({ type: 'jsonb', nullable: true })
  talkIds: number[];

  @ManyToMany(() => Talk, talk => talk.speakers)
  talks: Talk[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
