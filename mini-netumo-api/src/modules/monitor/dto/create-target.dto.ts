import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTargetDto {
  @ApiProperty({
    description: 'Name of the target (friendly name)',
    example: 'My Website',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Unique URL to monitor',
    example: 'https://example.com',
  })
  @IsUrl(
    { require_protocol: true },
    { message: 'URL must be a valid format and include http(s)://' },
  )
  @IsNotEmpty({ message: 'URL is required' })
  url: string;
}
