import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { PostsModel } from 'src/app/models/posts.model';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { PostsService } from './posts.service';
import { faMagnifyingGlass,faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  faMagnifyingGlass=faMagnifyingGlass;
  faCaretDown=faCaretDown;
  unSubscribe$ = new Subject<void>();
  isLoading = true;
  posts$!: Observable<PostsModel[]>;
  search: FormControl;

  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
  ) {this.search = new FormControl(''); }

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

  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
