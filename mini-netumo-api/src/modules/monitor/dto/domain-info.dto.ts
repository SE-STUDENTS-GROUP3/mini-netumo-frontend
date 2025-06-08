import { ApiProperty } from '@nestjs/swagger';

export class DomainInfoDto {
  @ApiProperty({ example: 1, description: 'Domain info ID' })
  id: number;

  @ApiProperty({
    example: '2025-12-01T00:00:00.000Z',
    description: 'SSL certificate expiry date',
    required: false,
  })
  sslExpiryDate?: Date;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Domain name expiry date',
    required: false,
  })
  domainExpiryDate?: Date;

  @ApiProperty({
    example: 30,
    description: 'Days remaining until SSL certificate expires',
    required: false,
  })
  daysToSslExpiry?: number;

  @ApiProperty({
    example: 200,
    description: 'Days remaining until domain expires',
    required: false,
  })
  daysToDomainExpiry?: number;

  @ApiProperty({
    example: '2025-06-07T13:00:00.000Z',
    description: 'Date when this record was created',
  })
  createdAt: Date;
}
