import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenResponse {
  @ApiProperty({ description: 'User jwt access token' })
  access: string;

  @ApiProperty({ description: 'User jwt refresh token' })
  refresh: string;
}
