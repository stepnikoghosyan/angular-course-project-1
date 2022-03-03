import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PostModel} from "../models/post.model";
import {map, Observable} from "rxjs";
import {PaginatedResponseModel} from "../models/paginated-response.model";

@Injectable()
export class PostsService {
  constructor(private httpClient: HttpClient) {
  }

  getPosts(): Observable<PaginatedResponseModel<PostModel>> {
    return this.httpClient.get<PaginatedResponseModel<PostModel>>(`${environment.apiUrl}/posts`)
      .pipe(map(data => {
        return {
          count: data.count,
          results: data.results.map(item => {
            return new PostModel(item);
          })
        };
      }));
  }
}
