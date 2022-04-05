import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  zip
} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';

import {PostModel} from "../../models/post.model";
import {PostsService} from "../../services/posts.service";
import {NotificationService} from "../../../../services/notification.service";
import {UserModel} from '../../models/user.model';
import {UsersService} from '../../services/users.service';
import {UserService} from 'src/app/services/user.service';
import {FormBuilder} from "@angular/forms";
import {PaginatedResponseModel} from "../../../../models/paginated-response.model";
import {PostsQueryParamsModel} from "../../models/posts-query-params.model";

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
  users$: Observable<UserModel[]> = of([]);

  filterForm = this.formBuilder.group({
    title: null,
    user: null
  });

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private notifyService: NotificationService,
              private userService: UserService,
              private router: Router) {
    this.currentUser = this.userService.getUser();
  }

  ngOnInit(): void {
    this.users$ = this.getUsers();
    !this.activatedRoute.snapshot.queryParams['page'] && this.onPageChange(1);
    zip(this.subscribeToQueryParamsChanges(), this.subscribeToFilterFormChanges())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.posts$ = this.getPosts()
      });
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.router.navigate(['/posts'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: event
      },
      queryParamsHandling: 'merge',
    });
  }

  private subscribeToQueryParamsChanges() {
    return this.activatedRoute.queryParams
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(queryParams => {
          this.filterForm.setValue({
            title: queryParams['title'] ? queryParams['title'] : null,
            user: queryParams['user'] ? +queryParams['user'] : null,
          });
          this.currentPage = queryParams['page'] ? +queryParams['page'] : this.currentPage;
          return of(null);
        }));
  }

  private subscribeToFilterFormChanges() {
    return this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(values => {
          this.router.navigate(['/posts'], {
            relativeTo: this.activatedRoute,
            queryParams: {
              title: values.title ? values.title : null,
              user: values.user ? values.user : null,
              page: this.currentPage
            },
          });
          return of(null);
        }));
  }

  private getPosts(): Observable<PostModel[]> {
    if (!this.isLoading)
      this.isLoading = true;
    let params: PostsQueryParamsModel = {
      userID: this.filterForm.controls['user'].value ? this.filterForm.controls['user'].value : '',
      title: this.filterForm.controls['title'].value ? this.filterForm.controls['title'].value : '',
      page: this.currentPage,
      pageSize: this.itemsPerPage
    }
    return this.postsService.getPosts(params)
      .pipe(
        finalize(() => {
          this.isLoading = false
        }),
        map(data => {
          this.totalItems = data.count;
          return data.results;
        }),
        catchError((err) => {
          this.notifyService.showError(err.error.message);
          return of([]);
        }));
  }

  private getUsers(): Observable<UserModel[]> {
    return this.usersService.getUsers()
      .pipe(
        map((data: PaginatedResponseModel<UserModel>) => {
          data.results = data.results.filter((val) => val.id !== this.currentUser?.id);
          data.results.unshift(this.currentUser!);
          return data.results;
        }),
        catchError((err) => {
          this.isLoading = false;
          this.notifyService.showError(err.error.message);
          return of([]);
        })
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
