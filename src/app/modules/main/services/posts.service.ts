import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResponseModel } from '../models/pagination-response';
import { commentsResponse, createCommentDto, PostModel } from '../models/post.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private httpClient: HttpClient,
        private router: Router,
        private notifyService: NotificationService) { };


    getPosts(value?: string): Observable<PaginationResponseModel<PostModel>> {
        let params = {};
        if (value) {
            params = {
                showAll: true,
                'title': value!
            }
        }
        return this.httpClient
            .get<PaginationResponseModel<PostModel>>(`${environment.apiUrl}/posts`, {params})
            .pipe(
                tap(() => {
                    console.log(params);
                 })
            )
    }

    getPost(id: number): Observable<PostModel> {
        return this.httpClient
            .get<PostModel>(`${environment.apiUrl}/posts/${id}`)
    }

    putPost(id: number, postForm: FormGroup): Observable<any> {
        const formData = new FormData();
        for (let key in postForm.value) {
            formData.append(key, postForm.value[key])
        };
        return this.httpClient
            .put<FormData>(`${environment.apiUrl}/posts/${id}`, formData)
            .pipe(
                tap(() => {
                    this.notifyService.success("Post is updated", "Success!!")
                    this.router.navigateByUrl('/main/posts');
                })
            )
    }

    createPost(postForm: FormGroup): Observable<any> {
        const formData = new FormData();
        for (let key in postForm.value) {
            formData.append(key, postForm.value[key])
        };
        return this.httpClient.post<FormData>(`${environment.apiUrl}/posts/`, formData)
    }

    getComments(id: number): Observable<commentsResponse> {
        let params = {
            'posts': id
        }
        return this.httpClient
            .get<commentsResponse>(`${environment.apiUrl}/comments`, { params })
    }


    createComment(createCommentDto: createCommentDto, id: number) {
        return this.httpClient.post<createCommentDto>(`${environment.apiUrl}/comments/${id}`, createCommentDto)

    }
}
