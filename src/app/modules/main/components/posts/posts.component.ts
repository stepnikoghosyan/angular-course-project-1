import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of, Subject, switchMap, takeUntil, tap } from "rxjs";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PostModel } from "../../models/post.model";
import { PostsService } from "../../services/posts.service";
import { NotificationService } from "../../../../services/notification.service";
import { PostsQueryParamsModel } from "../../models/posts-query-params.model";
import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { PaginatedResponseModel } from 'src/app/models/paginated-response.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  isLoading = true;
  posts$: Observable<PostModel[]> = of([]);
  selectedUser: UserModel | null = null;
  currentUser: UserModel | null;
  users: UserModel[] = [];

  private unsubscribe$ = new Subject<void>();
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService,
    private userService: UserService,
    private router: Router) {
    this.currentUser = this.userService.getUser();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private checkQueryParams(): void {
    this.posts$ = this.activatedRoute.queryParams.pipe(
      switchMap((queryParams: Params) => {
        const userId = queryParams['user'] ? +queryParams['user'] : null;
        if (userId) {
          this.selectedUser = this.users.filter((user) => user.id === userId)?.[0];
        }
        return this.getPosts();
      }))
  }

  private getPosts(): Observable<PostModel[]> {
    if (!this.isLoading)
      this.isLoading = true;
    let params: PostsQueryParamsModel = {
      showAll: true,
      userID: this.selectedUser ? this.selectedUser.id : ''
    }
    return this.postsService.getPosts(params)
      .pipe(
        finalize(() => { this.isLoading = false }),
        map(data => data.results),
        catchError((err) => {
          this.notifyService.showError(err.error.message);
          return of([]);
        }));
  }

  private getUsers(): void {
    this.usersService.getUsers()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((data: PaginatedResponseModel<UserModel>) => {
          data.results = data.results.filter((val) => val.id !== this.currentUser?.id);
          data.results.unshift(this.currentUser!);
          this.users = data.results;
          this.checkQueryParams();
        }),
        catchError((err) => {
          this.isLoading = false;
          this.notifyService.showError(err.error.message);
          return of([]);
        })
      ).subscribe()
  }

  filterByUser(): void {
    this.router.navigate(['/posts'], {
      relativeTo: this.activatedRoute,
      queryParams: { user: this.selectedUser ? this.selectedUser.id : '' }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
