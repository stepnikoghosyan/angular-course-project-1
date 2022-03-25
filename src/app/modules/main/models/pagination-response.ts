export interface PaginationResponseModel<T>{
    pageSize: number;
    results: T[];
}