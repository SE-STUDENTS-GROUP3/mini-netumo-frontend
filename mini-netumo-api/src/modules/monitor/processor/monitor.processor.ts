import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MONITOR_LOG, MONITOR_QUEUE } from 'src/modules/constants/queue';
import { Target } from '../entities/target.entity';
import { Repository } from 'typeorm';
import { MonitorLog } from '../entities/monitor-log.entity';
import { Queue } from 'bull';
import { STATUS } from '../enums/status.enum';
import axios from 'axios';

@Injectable()
@Processor(MONITOR_QUEUE)
export class MonitorProcessor {
  private readonly logger = new Logger(MonitorProcessor.name);

  constructor(
    @InjectRepository(Target) private targetRepo: Repository<Target>,
    @InjectRepository(MonitorLog) private logRepo: Repository<MonitorLog>,
    @InjectQueue(MONITOR_QUEUE) private readonly monitorQueue: Queue,
  ) {}

  onModuleInit() {
    void this.monitorQueue.add(MONITOR_LOG.CHECK, null, {
      jobId: MONITOR_LOG.CHECK,
      repeat: { every: 60 * 1000 },
    });
  }

  @Process(MONITOR_LOG.CHECK)
  async handleCheck() {
    this.logger.log('Monitor check triggered.');

    const targets = await this.targetRepo.find({
      where: { isActive: true },
    });

    this.logger.verbose(`Found ${targets.length} active targets to check.`);

    for (const target of targets) {
      const start = Date.now();
      let statusCode = 0;
      let latency = 0;
      let status = STATUS.UNKNOWN;
      let error: string | null = null;

      try {
        const response = await axios.get(target.url, { timeout: 5000 });
        latency = Date.now() - start;
        statusCode = response.status;

        if (response.status >= 200 && response.status < 400) {
          status = STATUS.UP;
        } else {
          status = STATUS.DOWN;
        }
      } catch (err) {
        latency = Date.now() - start;
        status = STATUS.DOWN;
        statusCode = err.response?.status || 500;
        error = err.message;
      }

      await this.logRepo.save(
        this.logRepo.create({
          target,
          statusCode,
          latencyMs: latency,
          status,
          error: error ?? undefined,
        }),
      );

      this.logger.log(
        `Checked ${target.name} (${target.url}) - Status: ${status}, Latency: ${latency}ms`,
      );
    }
  }
}
