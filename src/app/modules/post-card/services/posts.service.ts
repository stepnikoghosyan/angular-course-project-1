import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";
import {PostModel} from "../models/post.model";
import {PaginatedResponseModel} from "../../../models/paginated-response.model";
import {PostsQueryParamsModel} from "../models/posts-query-params.model";
import {UserService} from "../../../services/user.service";
import {CreatePostDto} from "../../posts/models/post.model";

@Injectable()
export class PostsService {
  constructor(private httpClient: HttpClient,
              private usersService: UserService) {
  }

  getPosts(): Observable<PaginatedResponseModel<PostModel>> {
    return this.httpClient.get<PaginatedResponseModel<PostModel>>(`${environment.apiUrl}/posts`);
  }

  getMyPosts(): Observable<PaginatedResponseModel<PostModel>> {
    return this.httpClient.get<PaginatedResponseModel<PostModel>>(`${environment.apiUrl}/posts`,
      {
        params: {
          userID: this.usersService.user ? this.usersService.user?.id : ''
        }
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
      params: this.paramsToHttpParams(params)
    });
  }

  getPostById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/posts/${id}`);
  }

  private paramsToHttpParams(params: PostsQueryParamsModel): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.append(key, value);
    })
    return httpParams;
  }

  createPost(params: CreatePostDto) {
    return this.httpClient.post<void>(`${environment.apiUrl}/posts`, params);
  }

  updatePost(id: number, params: CreatePostDto) {
    return this.httpClient.put<void>(`${environment.apiUrl}/posts/${id}`, params);
  }
}
