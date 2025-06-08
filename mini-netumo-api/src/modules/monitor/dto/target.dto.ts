import { ApiProperty } from '@nestjs/swagger';
import { MonitorLogDto } from './monitor-log..dto';
import { DomainInfoDto } from './domain-info.dto';
import { AlertDto } from './alert.dto';
import { ResponseDTO } from 'src/shared/dto/response.dto';

export class TargetDto {
  @ApiProperty({
    example: '8d90f453-9d6c-43f7-9a8e-7090ad0ef6c1',
    description: 'UUID of the target',
  })
  id: string;

  @ApiProperty({
    example: 'user-123',
    description: 'Owner ID who created this target',
  })
  ownerId: string;

  @ApiProperty({
    example: 'My Website',
    description: 'Human-friendly name of the target',
  })
  name: string;

  @ApiProperty({
    example: 'https://example.com',
    description: 'URL that is being monitored',
  })
  url: string;

  @ApiProperty({
    type: [MonitorLogDto],
    description: 'Monitoring logs associated with this target',
    required: false,
  })
  logs?: MonitorLogDto[];

  @ApiProperty({
    type: [DomainInfoDto],
    description: 'Domain information collected about this target',
    required: false,
  })
  domainInfos?: DomainInfoDto[];

  @ApiProperty({
    type: [AlertDto],
    description: 'Alerts triggered for this target',
    required: false,
  })
  alerts?: AlertDto[];

  @ApiProperty({ example: true, description: 'Whether the target is active' })
  isActive: boolean;

  @ApiProperty({
    example: '2025-06-07T13:00:00.000Z',
    description: 'When the target was created',
  })
  createdAt: Date;
}

export class TargetResponseDto extends ResponseDTO<TargetDto> {}
