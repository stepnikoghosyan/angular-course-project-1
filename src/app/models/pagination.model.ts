import { PostModel } from "./post.model";

export interface PaginationModel<P> {
    count: number;
    results: P[]
}