import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Target } from './target.entity';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Target, (target) => target.alerts, { onDelete: 'CASCADE' })
  target: Target;

  @Column()
  alertType: string;

  @Column()
  message: string;

  @CreateDateColumn()
  sentAt: Date;
}
