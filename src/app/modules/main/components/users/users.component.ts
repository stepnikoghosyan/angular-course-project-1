import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {catchError, debounceTime, map, Observable, of, startWith, switchMap, tap} from "rxjs";

import {UserModel} from "../../models/user.model";
import {UsersService} from "../../services/users.service";
import {UserQueryParamsModel} from "../../models/user-query-params.model";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isLoading = true;
  users$: Observable<UserModel[]> = of([]);
  searchControl = new FormControl();

  constructor(private userService: UsersService,
              private notifyService: NotificationService) {
  }

  ngOnInit() {
    this.onInputChange();
  }

  public onSearchButtonClick() {
    this.searchControl.setValue(this.searchControl.value)
  }

  private onInputChange() {
    this.users$ = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(value => {
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
