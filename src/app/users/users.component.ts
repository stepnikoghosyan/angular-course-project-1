import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { PostsParamsModel } from '../models/posts-params.model';
import { UserModelDto } from '../models/user.model';
import { NotificationService } from '../shared/notification.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UsersComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  unSubscribe$ = new Subject<void>();
  users$?: Observable<UserModelDto[]>;
  //postsParamsModel:PostsParamsModel
  isLoading = true;
  constructor(
    private usersService: UsersService,
    private notifyService: NotificationService,
  ) {
  
  }

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers().pipe(
      takeUntil(this.unSubscribe$),
      finalize(() => {
        this.isLoading = false;
      }),
      map((data:any) => {
        return data?.results
      } 
        ),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }))

  }

}
