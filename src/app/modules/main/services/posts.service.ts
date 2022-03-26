import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResponseModel } from '../models/pagination-response';
import { CreatePostModelDto, PostModel, PostModelDto } from '../models/post.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import { Form } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private httpClient: HttpClient,
        private router: Router,
        private notifyService: NotificationService) { };


    getPosts(): Observable<PaginationResponseModel<PostModel>> {

        return this.httpClient
            .get<PaginationResponseModel<PostModel>>(`${environment.apiUrl}/posts`, {
                params: {
                    showAll: true,
                }
            })
    }

    getPost(id: number): Observable<PostModel> {
        return this.httpClient
            .get<PostModel>(`${environment.apiUrl}/posts/${id}`)
    }

<<<<<<< HEAD
    putPost(id: number, postDto: FormData): Observable<any> {
        return this.httpClient
            .put<PostModel>(`${environment.apiUrl}/posts/${id}`, postDto)
            .pipe(
                tap(() => {
                    console.log("FORMDATA", postDto);
                    this.notifyService.success("Post is updated", "Success!!")
                    this.router.navigateByUrl('/main/posts');
                })
            )
    }

    createPost(postDto: FormData): Observable<any> {


=======
    putPost(id: number, postDto: FormData): Observable<any>{
        return this.httpClient
            .put<FormData>(`${environment.apiUrl}/posts/${id}`, postDto)
                .pipe(
                    tap(()=>{
                        this.notifyService.success("Post is updated", "Success!!")
                        this.router.navigateByUrl('/main/posts');
                    })
                )
    }

    createPost(postDto: FormData): Observable<any>{
>>>>>>> 33c9d0d273069c35f64617e1ad03c92a1cef1f10
        return this.httpClient.post<FormData>(`${environment.apiUrl}/posts/`, postDto)
    }

}