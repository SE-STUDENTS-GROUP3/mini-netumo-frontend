import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
  @ApiProperty({ type: String, format: 'date-time' })
  timestamp: Date;

  @ApiProperty({ description: 'Response status code', example: '200' })
  status: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty({
    description: 'Response description',
    example: 'Users fetched successfully',
  })
  message: string;

  @ApiProperty({ nullable: true, description: 'Response data' })
  data: T | null;

  @ApiProperty({ description: 'Request path', example: '/users/all' })
  path: string;

  constructor(
    timestamp: Date,
    status: number,
    success: boolean,
    message: string,
    data: T | null,
    path: string,
  ) {
    this.timestamp = timestamp;
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
    this.path = path;
  }

  static ok<T>(data: T, message: string, path: string): ResponseDTO<T> {
    return new ResponseDTO(new Date(), 200, true, message, data, path);
  }

  static error(
    status: number,
    message: string,
    path: string,
  ): ResponseDTO<null> {
    return new ResponseDTO(new Date(), status, false, message, null, path);
  }
}
