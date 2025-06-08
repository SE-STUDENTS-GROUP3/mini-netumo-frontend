import { ResponseDTO } from 'src/shared/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TargetDto } from './target.dto';

export class MonitorResponseDto extends ResponseDTO<TargetDto> {
  @ApiProperty({ type: TargetDto })
  declare data: TargetDto;
}
