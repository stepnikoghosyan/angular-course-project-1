import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of, switchMap } from "rxjs";

import { PostModel } from "../../models/post.model";
import { PostsService } from "../../services/posts.service";
import { NotificationService } from "../../../../services/notification.service";
import { PostsQueryParamsModel } from "../../models/posts-query-params.model";
import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginatedResponseModel } from 'src/app/models/paginated-response.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  isLoading = true;
  posts$: Observable<PostModel[]> = of([]);
  users$: Observable<UserModel[]> = of([]);
  selectedUser: UserModel | null = null;
  myEntity: UserModel | null;
  private users: UserModel[] = [];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService,
    private userService: UserService,
    private router: Router) {
    this.myEntity = this.userService.getUser();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private checkQueryParams(): void {
    this.posts$ = this.activatedRoute.queryParams.pipe(
      switchMap((queryParams:Params) => {
        const userId = queryParams['user'] ? +queryParams['user'] : null;
        if (userId) {
          this.selectedUser = this.users.filter((user) => user.id === userId)?.[0];
        }
        return this.getPosts();
      }))
  }

  private getPosts(): Observable<PostModel[]> {
    this.isLoading = true;
    let params: PostsQueryParamsModel = {
      showAll: true,
    }  
    return this.postsService.getPosts(params,this.selectedUser?.id)
      .pipe(
        finalize(() => this.isLoading = false),
        map(data => data.results),
        catchError((err) => {
          this.notifyService.showError(err.error.message);
          return of([]);
        }));
  }

  private getUsers(): void {
    this.users$ = this.usersService.getUsers()
      .pipe(
        finalize(() => { this.isLoading = false; }),
        map((data: PaginatedResponseModel<UserModel>) => {
          data.results = data.results.filter((val) => val.id !== this.myEntity?.id);
          data.results.unshift(this.myEntity!);
          this.users = data.results;
          this.checkQueryParams();
          return data.results;
        }),
        catchError((err) => {
          this.notifyService.showError(err.error.message);
          return of([]);
        })
      )
  }

  filterByUser(): void {
    this.router.navigate(['/posts'], {
      relativeTo: this.activatedRoute,
      queryParams: { user: this.selectedUser ? this.selectedUser.id : '' }
    })
  }
}
