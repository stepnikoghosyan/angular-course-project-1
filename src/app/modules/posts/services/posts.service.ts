import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

import { environment } from "../../../../environments/environment";
import { PostModel } from "../models/post.model";
import { PaginatedResponseModel } from "../../../models/paginated-response.model";
import { UserService } from "../../../services/user.service";

@Injectable()
export class PostsService {
  constructor(private httpClient: HttpClient, private usersService: UserService) {
  }

  getPosts(): Observable<PaginatedResponseModel<PostModel>> {
    return this.httpClient.get<PaginatedResponseModel<PostModel>>(`${environment.apiUrl}/posts`);
  }
  getMyPosts(): Observable<PaginatedResponseModel<PostModel>> {
    return this.httpClient.get<PaginatedResponseModel<PostModel>>(`${environment.apiUrl}/posts`,
      {
        params: {
          userID: this.usersService.user ? this.usersService.user?.id.toString() : ''
        }
      });
  }
}
