import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('talk_requests')
export class TalkRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  @Index()
  email: string;

  @Column()
  company: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: false })
  processed: boolean;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @Column({ default: 0 })
  spamScore: number;

  @Column({ default: false })
  isSpam: boolean;

  @Column({ nullable: true })
  @Index()
  ipAddress: string;

  @Column({ default: false })
  emailSent: boolean;
} 