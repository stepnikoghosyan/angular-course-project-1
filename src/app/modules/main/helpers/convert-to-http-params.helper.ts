import {PostsQueryParamsModel} from "../models/posts-query-params.model";
import {HttpParams} from "@angular/common/http";

export function paramsToHttpParams(params: PostsQueryParamsModel): HttpParams {
  let httpParams = new HttpParams();
  Object.entries(params).forEach(([key, value]) => {
    httpParams = httpParams.append(key, value);
  })
  return httpParams;
}
