import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { catchError, debounceTime, finalize, map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { UserModelDto } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/notification-service/notification.service';

import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  unSubscribe$ = new Subject<void>();
  users$?: Observable<UserModelDto[]>;
  search: FormControl;
  isLoading = true;
  pageSize = 12;
  page = 1;
  pageArr?: any[]

  constructor(
    private usersService: UsersService,
    private notifyService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.search = new FormControl('');
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(takeUntil(this.unSubscribe$), debounceTime(300))
    .subscribe({
      next: (value: string) => {
        this.router.navigate(['/users'], {
          queryParams: {
            search: value,
            pageSize: this.pageSize,
            page: this.page
          }
        })
      }
    })

    this.activatedRoute.queryParams
      .subscribe({
        next: (params) => { 
          this.users$ = this.getUser(params['page'], params['pageSize'], params['search']);
        }
      })

  }


  getUser(index = this.page, pageSize = this.pageSize, search = this.search.value) {
    return this.usersService.getUsers(pageSize, index, search).pipe(
      takeUntil(this.unSubscribe$),
      finalize(() => {
        this.isLoading = false;
      }),
      map((data: any) => {
        const pageCount = Math.ceil(data.count / this.pageSize);
        this.pageArr = new Array(pageCount);
        return data?.results
      }
      ),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }))

  }

  goToPage(index: number) {
    this.isLoading = true;
    this.users$ = this.getUser(index);
  }

  

}
