export interface PaginationResponseModel<T>{
    userID: number;
    pageSize: number;
    results: T[];
    showAll: boolean;
    page: number;
    title: string
}