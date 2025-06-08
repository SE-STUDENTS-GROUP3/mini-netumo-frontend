import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '../enums/status.enum';

export class MonitorLogDto {
  @ApiProperty({ example: 1, description: 'Monitoring log ID' })
  id: number;

  @ApiProperty({
    example: 200,
    description: 'HTTP status code from the target',
  })
  statusCode: number;

  @ApiProperty({
    description: 'Target status',
    enum: STATUS,
  })
  status: STATUS;

  @ApiProperty({ example: 150, description: 'Latency in milliseconds' })
  latencyMs: number;

  @ApiProperty({
    example: 'Connection timed out',
    description: 'Error message if the check failed',
    required: false,
  })
  error?: string;

  @ApiProperty({
    example: '2025-06-07T13:00:00.000Z',
    description: 'Timestamp when log was recorded',
  })
  createdAt: Date;
}
