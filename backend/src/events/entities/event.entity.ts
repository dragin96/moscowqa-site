import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Talk } from '../../talks/entities/talk.entity';

@Entity('events')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  videoLink: string;

  @Column({ nullable: true })
  slidesLink: string;

  @Column({ nullable: true })
  materialsLink: string;

  @Column({ nullable: true, name: 'registration_link' })
  registrationLink: string;

  @OneToMany(() => Talk, talk => talk.event)
  talks: Talk[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
