// alert.processor.ts
import { Process, Processor, InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';
import { Target } from '../entities/target.entity';
import { Queue } from 'bull';
import { DomainInfo } from '../entities/domain-info.entity';
import { ALERT_JOB, MONITOR_QUEUE } from 'src/modules/constants/queue';

@Injectable()
@Processor(MONITOR_QUEUE)
export class AlertProcessor {
  private readonly logger = new Logger(AlertProcessor.name);

  constructor(
    @InjectRepository(Target) private targetRepo: Repository<Target>,
    @InjectRepository(Alert) private alertRepo: Repository<Alert>,
    @InjectRepository(DomainInfo)
    private domainInfoRepo: Repository<DomainInfo>,
    @InjectQueue(MONITOR_QUEUE) private readonly alertQueue: Queue,
  ) {}

  onModuleInit() {
    void this.alertQueue.add(ALERT_JOB.CHECK_AND_SAVE, null, {
      jobId: ALERT_JOB.CHECK_AND_SAVE,
      repeat: { every: 5 * 60 * 1000 },
    });
  }

  @Process(ALERT_JOB.CHECK_AND_SAVE)
  async handleAlertCheck() {
    this.logger.log('Running Alert check job...');
    const targets = await this.targetRepo.find({ where: { isActive: true } });

    for (const target of targets) {
      try {
        const latestInfo = await this.domainInfoRepo.findOne({
          where: { target: { id: target.id } },
          order: { createdAt: 'DESC' },
        });

        if (!latestInfo) continue;

        const alerts: { alertType: string; message: string }[] = [];

        if (
          latestInfo.daysToSslExpiry !== null &&
          latestInfo.daysToSslExpiry <= 7
        ) {
          alerts.push({
            alertType: 'SSL_EXPIRY_SOON',
            message: `SSL certificate for ${target.url} expires in ${latestInfo.daysToSslExpiry} days.`,
          });
        }

        if (
          latestInfo.daysToDomainExpiry !== null &&
          latestInfo.daysToDomainExpiry <= 7
        ) {
          alerts.push({
            alertType: 'DOMAIN_EXPIRY_SOON',
            message: `Domain for ${target.url} expires in ${latestInfo.daysToDomainExpiry} days.`,
          });
        }

        for (const alertData of alerts) {
          const alert = this.alertRepo.create({
            target,
            alertType: alertData.alertType,
            message: alertData.message,
          });

          await this.alertRepo.save(alert);
          this.logger.log(
            `Saved alert for ${target.url}: ${alertData.message}`,
          );
        }
      } catch (error) {
        this.logger.error(`Failed alerts for ${target.url}: ${error.message}`);
      }
    }
  }
}
