import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PostsModel } from 'src/app/models/posts.model';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { PostsService } from './posts.service';
import { faMagnifyingGlass, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users/users.service';


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
  posts$!:any
  search: FormControl;
  usersInfo: any = [];
  users: any = [];
  author: FormControl
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
    private usersService: UsersService
  ) {
    this.search = new FormControl('');
    this.author = new FormControl('');
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts().pipe(
      takeUntil(this.unSubscribe$),
      finalize(() => {
        this.isLoading = false;
      }),
      map(data => data.results),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }))
    this.getUsersName();

    this.searchUser()

  }


  searchUser(){
   return this.author.valueChanges.pipe(takeUntil(this.unSubscribe$),
      switchMap((id: any) => {
        this.isLoading = false;
        return this.postsService.getPosts(id)
      }),
    
    ) .subscribe({
      next: (res) => {
        console.log(res)
      }
    })
   
  }
  getUsersName() {
    this.usersService.getAllUsers().subscribe(val => {
      this.usersInfo = val
      this.users = this.usersInfo.results
      this.users.unshift({ firstName: '', lastName: '@ME' })
    })

  }


  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
