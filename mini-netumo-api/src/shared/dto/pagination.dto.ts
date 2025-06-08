import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty({ isArray: true })
  items: T[];
}
