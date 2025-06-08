import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Target } from './target.entity';

@Entity()
export class DomainInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Target, (target) => target.domainInfos, {
    onDelete: 'CASCADE',
  })
  target: Target;

  @Column({ type: 'timestamp', nullable: true })
  sslExpiryDate: Date;

  @Column({ nullable: true })
  domainExpiryDate: Date;

  @Column({ nullable: true })
  daysToSslExpiry: number;

  @Column({ nullable: true })
  daysToDomainExpiry: number;

  @Column({ nullable: true })
  domainName: string;

  @Column({ nullable: true })
  registrantName: string;

  @Column({ nullable: true })
  domainStatus: string;

  @Column({ nullable: true })
  registrarUrl: string;

  @Column({ nullable: true })
  domainId: string;

  @CreateDateColumn()
  createdAt: Date;
}
