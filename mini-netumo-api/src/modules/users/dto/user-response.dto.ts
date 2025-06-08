import { ResponseDTO } from 'src/shared/dto/response.dto';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto extends ResponseDTO<UserDto> {
  @ApiProperty({ type: UserDto })
  declare data: UserDto;
}
