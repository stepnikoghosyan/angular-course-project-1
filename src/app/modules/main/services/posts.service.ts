import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../../environments/environment";
import { PostFormModel, PostModel } from "../models/post.model";
import { PaginatedResponseModel } from "../../../models/paginated-response.model";
import { PostsQueryParamsModel } from "../models/posts-query-params.model";
import { paramsToHttpParams } from "../helpers/convert-to-http-params.helper";
import { convertToFormData } from "../helpers/json-to-form-data.helper";

@Injectable()
export class PostsService {
  constructor(private httpClient: HttpClient) {
  }

  getPosts(params?: PostsQueryParamsModel, userId?: number): Observable<PaginatedResponseModel<PostModel>> {
    if (userId) {
      params = Object.assign(params, { userID: userId });
    }
    return this.httpClient.get<PaginatedResponseModel<PostModel>>(`${environment.apiUrl}/posts`, {
      params: params ? paramsToHttpParams(params) : {}
    });
  }

  getPostsByPagination(params?: PostsQueryParamsModel) {
    if (!params) {
      params = {
        page: 1,
        pageSize: 10
      }
    }

    return this.httpClient.get<PaginatedResponseModel<PostModel>>(`${environment.apiUrl}/posts`, {
      params: paramsToHttpParams(params)
    });
  }

  getPostById(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(`${environment.apiUrl}/posts/${id}`);
  }
  createPost(formValue: PostFormModel): Observable<PostModel> {
    const formData = convertToFormData<PostFormModel>(formValue);
    return this.httpClient.post<PostModel>(`${environment.apiUrl}/posts`, formData);
  }

  updatePost(id: number, formValue: PostFormModel): Observable<PostModel> {
    const formData = convertToFormData<PostFormModel>(formValue);
    return this.httpClient.put<PostModel>(`${environment.apiUrl}/posts/${id}`, formData);
  }
}
