import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, debounceTime, finalize, map, of, Subject, switchMap, takeUntil} from 'rxjs';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { PostsService } from './posts.service';
import { faMagnifyingGlass, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users/users.service';
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
  posts: any;
  search: FormControl;
  usersInfo: any = [];
  users: any = [];
  author: FormControl;
  
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.search = new FormControl('');
    this.author = new FormControl('');
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(takeUntil(this.unSubscribe$),
    debounceTime(300))
    .subscribe({
      next: (value: string) => {
        this.isLoading = false;
        this.router.navigate(['/posts'], {
          queryParams: {
            userId: value
          }
        }
        )
      }
    })

    this.activatedRoute.queryParams.pipe(takeUntil(this.unSubscribe$),
      switchMap((params) => {
        return this.postsService.getPosts(params['userId'])
      })
    )
    .subscribe({
      next: (params) => {
        this.isLoading = false;
        this.posts = params.results;
      }
    })

    // this.postsService.getPosts().pipe(
    //   takeUntil(this.unSubscribe$),
    // ).subscribe({
    //   next: (data) => {
    //     this.isLoading = false;
    //     this.posts = data.results;
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     this.notifyService.showError('error', err.error.message)
    //   }
    // })

    this.getUsersName();
    // this.searchUser();

  }


  searchUser(){
    let userId = 0
    this.author.valueChanges.pipe(takeUntil(this.unSubscribe$),
      switchMap((id: number) => {
        this.isLoading = false;
        userId = id;

        return this.postsService.getPosts(id);
      
      }),
    ) .subscribe({
      next: (data) => {
       this.isLoading = false;
       this.posts = data.results;
      
       this.router.navigate(['/posts'], 
       {
         queryParams: {
           userId: userId
         }
       }
       )
      }
    })
   
  }



  getUsersName() {
    this.usersService.getAllUsers().subscribe(val => {
      this.usersInfo = val;
      this.users = this.usersInfo.results;
      this.users.unshift({ firstName: '', lastName: '@ME'});
    })

  }


  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
