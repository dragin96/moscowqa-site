import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Talk } from '../../talks/entities/talk.entity';

@Entity('speakers')
export class Speaker {
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

  @Column({ nullable: true })
  bio: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telegram: string;

  @Column({ nullable: true })
  github: string;

  @ManyToMany(() => Talk, (talk) => talk.speakers)
  talks: Talk[];
}
