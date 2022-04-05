import {Component, OnInit} from "@angular/core";
import {catchError, debounceTime, map, Observable, of, startWith, Subject, switchMap} from "rxjs";

import {UserModel} from "../../models/user.model";
import {UsersService} from "../../services/users.service";
import {UserQueryParamsModel} from "../../models/user-query-params.model";
import {NotificationService} from "../../../../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isLoading = true;
  users$: Observable<UserModel[]> = of([]);
  searchText: string = '';
  searchTextChanged$: Subject<string> = new Subject<string>();

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService,
              private notifyService: NotificationService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.searchText = queryParams['search'] ? queryParams['search'] : '';
      this.currentPage = queryParams['page'] ? +queryParams['page'] : this.currentPage;
    })
    this.onSearchChanged();
  }

  onSearchButtonClick() {
    this.currentPage = 1;
    this.searchTextChanged$.next(this.searchText);
  }

  onInputChange(event: string) {
    this.currentPage = 1;
    this.searchTextChanged$.next(event);
  }

  onPageChange(event: number) {
    this.isLoading = true;
    this.currentPage = event;
    this.searchTextChanged$.next(this.searchText);
  }

  private onSearchChanged() {
    this.users$ = this.searchTextChanged$.pipe(
      startWith(this.searchText),
      debounceTime(300),
      switchMap(value => {
        this.isLoading = true;
        this.router.navigate(['/users'], {
          relativeTo: this.activatedRoute,
          queryParams: {
            page: this.currentPage,
            search: value,
          },
        });
        return this.getUsers(value)
      }));
  }

  private getUsers(searchValue: string): Observable<UserModel[]> {
    const params: UserQueryParamsModel = {
      search: searchValue,
      page: this.currentPage,
      pageSize: this.itemsPerPage
    }
    return this.userService.getUsers(params)
      .pipe(
        map(data => {
          this.isLoading = false;
          this.totalItems = data.count;
          this.router.navigate(['/users'], {
            relativeTo: this.activatedRoute,
            queryParams: {
              page: this.currentPage,
              search: this.searchText
            },
          });
          return data.results
        }),
        catchError((err) => {
          this.isLoading = false;
          this.notifyService.showError(err.error.message);
          return of([]);
        }));
  }
}
