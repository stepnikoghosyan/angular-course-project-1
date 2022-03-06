export interface PaginationResponseModel<T>{
    pageSize: number;
    items: T[];
}