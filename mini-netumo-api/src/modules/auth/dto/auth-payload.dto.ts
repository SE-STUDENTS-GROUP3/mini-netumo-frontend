import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthPayloadDto {
  @ApiProperty({ description: 'user email address' })
  @IsEmail()
  username: string;

  @ApiProperty({ description: 'User pasword' })
  @IsNotEmpty()
  password: string;
}
