import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, map, Observable, of, Subject, takeUntil } from 'rxjs';
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
  isLoading = true;


  pageZise = 10;
  page = 1;
  pageArr?: any[]
  @ViewChild('userCard')
  private elRef?: ElementRef;
  constructor(
    private usersService: UsersService,
    private notifyService: NotificationService,
    private renderer: Renderer2
  ) {

  }

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers(this.pageZise, this.page).pipe(
      takeUntil(this.unSubscribe$),
      finalize(() => {
        this.isLoading = false;
      }),
      map((data: any) => {
        this.page = Math.ceil(data.count / this.pageZise);
        this.pageArr = new Array(this.page);
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
    console.log(index);
     this.usersService.getUsers(this.pageZise, index)
    .pipe(takeUntil(this.unSubscribe$))
    .subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
      
     
    
    
  }

}
