import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User contact phone number',
    example: '+255746561545',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongPassword',
  })
  @IsNotEmpty()
  password: string;
}
