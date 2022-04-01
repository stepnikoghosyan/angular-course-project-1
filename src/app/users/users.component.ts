import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { catchError, debounceTime, finalize, map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
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
    
    this.search.valueChanges.pipe(takeUntil(this.unSubscribe$), debounceTime(300),
      switchMap((res: string) => {
        
        return this.activatedRoute.queryParams
      })
    ).subscribe({
      next: (params) => {
        
        this.users$ = this.getUser(params['page'],);
      }
    })



    this.activatedRoute.queryParams
      .subscribe({
        next: (params) => {
       
          this.users$ = this.getUser(params['page'], params['search']);
        }
      })

  }


  getUser(index = this.page, search = this.search.value) {
    return this.usersService.getUsers(this.pageSize, index, search).pipe(
      takeUntil(this.unSubscribe$),
      finalize(() => {
        this.isLoading = false;
      }),
      map((data: any) => {

        this.page = Math.ceil(data.count / this.pageSize);
        this.pageArr = new Array(this.page);
        if (search != '') {
          this.router.navigate(['/users'], {
            queryParams: {
              showAll: false,
              search: search,
            }
          })
        } else {
          this.router.navigate(['/users'], {
            queryParams: {
              pageSize: this.pageSize,
              page: index,
              showAll: false,
            }
          })
        }
        return data?.results
      }
      ),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }))

  }

  goToPage(index: number) {
    index += 1;
    this.users$ = this.getUser(index);
  }

}
