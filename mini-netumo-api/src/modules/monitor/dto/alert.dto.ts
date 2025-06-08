import { ApiProperty } from '@nestjs/swagger';
import { ResponseDTO } from 'src/shared/dto/response.dto';

export class AlertDto {
  @ApiProperty({ example: 1, description: 'Alert ID' })
  id: number;

  @ApiProperty({
    example: 'SSL_EXPIRY',
    description: 'Type of alert triggered',
  })
  alertType: string;

  @ApiProperty({
    example: 'SSL certificate is expiring in 5 days',
    description: 'Message describing the alert',
  })
  message: string;

  @ApiProperty({
    example: '2025-06-07T13:00:00.000Z',
    description: 'When the alert was sent',
  })
  sentAt: Date;
}

export class AlertResponseDto extends ResponseDTO<AlertDto> {}
