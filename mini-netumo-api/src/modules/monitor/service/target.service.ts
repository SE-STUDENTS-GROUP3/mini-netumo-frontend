import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from '../entities/target.entity';
import { Repository } from 'typeorm';
import { CreateTargetDto } from '../dto/create-target.dto';
import { TargetDto } from '../dto/target.dto';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target) private targetRepo: Repository<Target>,
  ) {}

  async create(
    createTargetDto: CreateTargetDto,
    ownerId: string,
  ): Promise<TargetDto> {
    const existingTarget = await this.targetRepo.findOne({
      where: {
        url: createTargetDto.url,
      },
    });

    if (existingTarget) {
      throw new ConflictException(`${createTargetDto.url} already exists`);
    }

    const target = this.targetRepo.create({
      name: createTargetDto.name,
      url: createTargetDto.url,
      ownerId: ownerId,
    });

    const savedTarget = await this.targetRepo.save(target);

    const targetDto: TargetDto = {
      id: savedTarget.id,
      ownerId: savedTarget.ownerId,
      name: savedTarget.name,
      url: savedTarget.url,
      isActive: savedTarget.isActive,
      createdAt: savedTarget.createdAt,
      alerts: [],
      domainInfos: [],
      logs: [],
    };

    return targetDto;
  }

  async findByOwner(ownerId: string): Promise<TargetDto[]> {
    const targets = await this.targetRepo.find({
      where: {
        ownerId: ownerId,
      },
    });

    return targets;
  }

  async findTarget(ownerId: string, targetId: string): Promise<TargetDto> {
    const target = await this.targetRepo.findOne({
      where: {
        ownerId: ownerId,
        id: targetId,
      },
    });

    if (!target) {
      throw new NotFoundException('target not found');
    }

    return target;
  }
}
