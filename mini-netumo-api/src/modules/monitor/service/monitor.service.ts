import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from '../entities/target.entity';
import { Repository } from 'typeorm';
import { DomainInfo } from '../entities/domain-info.entity';
import { Alert } from '../entities/alert.entity';

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(Target) private targetRepo: Repository<Target>,
    @InjectRepository(DomainInfo) private domainRepo: Repository<DomainInfo>,
    @InjectRepository(Alert) private alertRepo: Repository<Alert>,
  ) {}

  get;
}
