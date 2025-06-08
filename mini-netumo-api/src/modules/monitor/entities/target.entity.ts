import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { MonitorLog } from './monitor-log.entity';
import { DomainInfo } from './domain-info.entity';
import { Alert } from './alert.entity';

@Entity()
export class Target {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  ownerId: string;

  @Column()
  name: string;

  @Column({ nullable: false, unique: true })
  url: string;

  @OneToMany(() => MonitorLog, (log) => log.target)
  logs: MonitorLog[];

  @OneToMany(() => DomainInfo, (info) => info.target)
  domainInfos: DomainInfo[];

  @OneToMany(() => Alert, (alert) => alert.target)
  alerts: Alert[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  domainInfoFound: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
