import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Target } from './target.entity';
import { STATUS } from '../enums/status.enum';

@Entity()
export class MonitorLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Target, { onDelete: 'CASCADE' })
  target: Target;

  @Column()
  statusCode: number;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.UNKNOWN })
  status: STATUS;

  @Column()
  latencyMs: number;

  @Column({ nullable: true })
  error: string;

  @CreateDateColumn()
  createdAt: Date;
}
