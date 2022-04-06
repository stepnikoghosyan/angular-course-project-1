import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { PostsModel } from 'src/app/models/posts.model';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { PostsService } from './posts.service';
import { faMagnifyingGlass, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { UserModelDto } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  faMagnifyingGlass = faMagnifyingGlass;
  faCaretDown = faCaretDown;
  unSubscribe$ = new Subject<void>();
  isLoading = true;
  posts$: Observable<PostsModel[]> = of([]);
  users$: Observable<UserModelDto[]> = of([]);

  search: FormControl;
  userDate: FormControl;
  usersInfo: any = [];
  userName: any = [];
  currenUser: any;
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.currenUser = this.usersService.currentProfile;
    this.search = new FormControl('');
    this.userDate = new FormControl('')
  }

  ngOnInit(): void {
    this.givUsersName();
    this.changeUserFormControl();
    this.changeTitleControl();
    this.checkQueryParams()
  }
  private changeUserFormControl(): void {
    this.userDate.valueChanges.pipe(takeUntil(this.unSubscribe$),
      debounceTime(300)
    ).subscribe({
      next: () => {
        this.sendQueryParams()
      }
    })
  }
  private changeTitleControl(): void {
    this.search.valueChanges.pipe(takeUntil(this.unSubscribe$),
      debounceTime(300)).subscribe({
        next: () => {
          this.sendQueryParams()
        }
      })
  }
  private checkQueryParams(): void {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.unSubscribe$),
      distinctUntilChanged()
    )
      .subscribe((params: any) => {
        this.search.setValue(params.search ? params.search : '');
        this.userDate.setValue(params.user ? params.user : null);
        this.getPosts();
      })
  }
  private getPosts(): void {
    const params = {
      userID: this.userDate.value ? this.userDate.value : '',
      showAll: true,
      title: this.search.value ? this.search.value : ''
    }
    this.posts$ = this.postsService.getPosts(params).pipe(
      takeUntil(this.unSubscribe$),
      finalize(() => {
        this.isLoading = false;
      }),
      map(data => data.results),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }));
  }
  sendQueryParams() {
    this.router.navigate(['/posts'], {
      queryParams: {
        search: this.search.value,
        user: this.userDate.value
      },
      relativeTo: this.activatedRoute
    })
  }
  // getAllUsers() {
  //   this.postsService.getPosts()
  //     .pipe(takeUntil(this.unSubscribe$))
  //     .subscribe({
  //       next: (res) => {
  //         this.isLoading = false
  //         this.posts$ = res.results
  //       }
  //     })

  // }



  // getUser() {
  //   this.userDate.valueChanges
  //     .pipe(takeUntil(this.unSubscribe$))
  //     .subscribe({
  //       next: (id: number) => {
  //         this.postsService.getPosts(id).subscribe((res) => {
  //           this.posts = res.results
  //         })
  //       }
  //     })
  // }



  givUsersName(): void {
    this.users$ = this.usersService.getAllUsers().pipe(
      map((data: any) => {
        data.results = data.results.filter((val: any) => val.id !== this.currenUser.id);
        data.results.unshift(this.currenUser);
        return data.results;
      })
    )
  }


  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
