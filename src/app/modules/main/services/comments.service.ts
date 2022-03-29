import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PaginatedResponseModel} from 'src/app/models/paginated-response.model';
import {environment} from 'src/environments/environment';
import {paramsToHttpParams} from '../helpers/convert-to-http-params.helper';
import {CommentDto, CommentModel} from '../models/comment.model';
import {CommentsQueryParamsModel} from '../models/comments-query-params.model';

@Injectable()
export class CommentsService {

  constructor(private httpClient: HttpClient) {
  }

  getComments(params: CommentsQueryParamsModel): Observable<PaginatedResponseModel<CommentModel>> {
    return this.httpClient.get<PaginatedResponseModel<CommentModel>>(`${environment.apiUrl}/comments`,
      {
        params: params ? paramsToHttpParams(params) : {}
      });
  }

  addComment(postId: number, body: CommentDto): Observable<CommentModel> {
    return this.httpClient.post<CommentModel>(`${environment.apiUrl}/comments/${postId}`, body)
  }
}
