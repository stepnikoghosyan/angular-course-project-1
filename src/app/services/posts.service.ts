import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {PostModel} from "../models/post.model";
import {PaginatedResponseModel} from "../models/paginated-response.model";

@Injectable()
export class PostsService {
  constructor(private httpClient: HttpClient) {
  }

  getPosts(): Observable<PaginatedResponseModel<PostModel>> {
    return this.httpClient.get<PaginatedResponseModel<PostModel>>(`${environment.apiUrl}/posts`);
  }
}
