import { Module } from '@nestjs/common';
import { MonitorController } from './controller/monitor.controller';
import { MonitorService } from './service/monitor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Target } from './entities/target.entity';
import { Alert } from './entities/alert.entity';
import { DomainInfo } from './entities/domain-info.entity';
import { MonitorLog } from './entities/monitor-log.entity';
import { TargetService } from './service/target.service';
import { TargetController } from './controller/target.controller';
import { AlertController } from './controller/alert.controller';
import { AlertService } from './service/alert.service';
import { BullModule } from '@nestjs/bull';
import { MONITOR_QUEUE } from '../constants/queue';
import { MonitorProcessor } from './processor/monitor.processor';
import { DomainInfoProcessor } from './processor/domain-info.processor';
import { AlertProcessor } from './processor/alert.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Target, Alert, DomainInfo, MonitorLog]),
    BullModule.registerQueue({
      name: MONITOR_QUEUE,
      defaultJobOptions: {
        lifo: true,
        attempts: 15,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    }),
  ],
  controllers: [MonitorController, TargetController, AlertController],
  providers: [
    MonitorService,
    TargetService,
    AlertService,
    MonitorProcessor,
    DomainInfoProcessor,
    AlertProcessor,
    AlertProcessor,
  ],
})
export class MonitorModule {}
