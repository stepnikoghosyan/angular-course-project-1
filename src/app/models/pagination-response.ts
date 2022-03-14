export interface PaginationResponseModel<T>{
    pageSize: number;
    // showAll: boolean;
    // pageNumber: number;
    results: T[];
}