import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from '../entities/alert.entity';
import { Repository } from 'typeorm';
import { AlertDto } from '../dto/alert.dto';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert) private alertRepository: Repository<Alert>,
  ) {}

  async getAlerts(ownerId: string, targetId: string): Promise<AlertDto[]> {
    const alerts = await this.alertRepository.find({
      relations: ['target'],
      where: {
        target: {
          id: targetId,
          ownerId: ownerId,
        },
      },
      order: {
        sentAt: 'DESC',
      },
    });

    return alerts;
  }
}
