import { QueryParamsModel } from './query-params.model';

export interface PostsQueryParamsModel extends QueryParamsModel {
  userID?: number | string;
}
