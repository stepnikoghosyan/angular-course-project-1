import { QueryParamsModel } from './query-params.model';

export interface UserQueryParamsModel extends QueryParamsModel{
  search?: string;
  excludeSelf?: true;
}
