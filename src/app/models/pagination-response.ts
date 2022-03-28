export interface PaginationResponseModel<T>{
    imageUrl: string | null;
    id: number;
    userID: number;
    pageSize: number;
    results: T[];
    showAll: boolean;
    page: number;
    title: string
}