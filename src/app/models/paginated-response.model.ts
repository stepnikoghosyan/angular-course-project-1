export interface PaginatedResponseModel<T> {
  count: number;
  results: T[];
}
