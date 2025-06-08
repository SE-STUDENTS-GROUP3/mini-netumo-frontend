interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export type { ApiError, PaginatedResponse }