import { ResponseDTO } from './response.dto';
import { Pagination } from './pagination.dto';

export class PaginatedResponseDTO<T> extends ResponseDTO<Pagination<T>> {}
