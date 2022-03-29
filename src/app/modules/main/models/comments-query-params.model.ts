import { QueryParamsModel } from './query-params.model';

export interface CommentsQueryParamsModel extends QueryParamsModel {
    posts: number[];
}