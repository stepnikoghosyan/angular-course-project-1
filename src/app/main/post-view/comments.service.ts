import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createCommentModel } from 'src/app/models/coments.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly baseUrl: string = environment.Api_Url;
  constructor(
    private httpClient: HttpClient,
  ) { }


  getComments(id: number) {
    const queryParams = new HttpParams().append('posts', id);
    return this.httpClient.get(`${this.baseUrl}comments`, {
      params: queryParams
    })
  }

  addComments(postId: number, obj: createCommentModel) {
    const jsonObj = JSON.stringify(obj);
    return this.httpClient.post(`${this.baseUrl}comments/${postId}`, obj)
  }
}
