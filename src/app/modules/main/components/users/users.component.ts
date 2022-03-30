import {Component, OnInit} from "@angular/core";
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, startWith, Subject, switchMap} from "rxjs";

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
  isButtonClicked: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService,
              private notifyService: NotificationService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.searchText = queryParams['search'] ? queryParams['search'] : '';
    })
    this.onSearchChanged();
  }

  onSearchButtonClick() {
    this.isButtonClicked = true;
    this.searchTextChanged$.next(this.searchText);
  }

  onInputChange(event: string) {
    this.searchTextChanged$.next(event);
  }

  private onSearchChanged() {
    this.users$ = this.searchTextChanged$.pipe(
      startWith(this.searchText),
      debounceTime(300),
      distinctUntilChanged((prev, curr) => {
        return !(prev !== curr || this.isButtonClicked)
      }),
      switchMap(value => {
        this.isLoading = true;
        this.isButtonClicked = false;
        this.router.navigate(['/users'], {
          relativeTo: this.activatedRoute,
          queryParams: {
            search: value
          },
        });
        return this.getUsers(value)
      }));
  }

  private getUsers(searchValue: string): Observable<UserModel[]> {
    const params: UserQueryParamsModel = {
      search: searchValue,
    }
    return this.userService.getUsers(params)
      .pipe(
        map(data => {
          this.isLoading = false;
          return data.results
        }),
        catchError((err) => {
          this.isLoading = false;
          this.notifyService.showError(err.error.message);
          return of([]);
        }));
  }
}
