import {Component, OnInit} from "@angular/core";
import {catchError, finalize, map, Observable, of} from "rxjs";
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

  constructor(private userService: UsersService,
              private notifyService: NotificationService) {
  }

  ngOnInit() {
    const params: UserQueryParamsModel = {
      showAll: true,
    }
    this.users$ = this.userService.getUsers(params)
      .pipe(
        finalize(() => this.isLoading = false),
        map(data => data.results),
        catchError((err) => {
          this.notifyService.showError(err.error.message);
          return of([]);
        }));
  }
}
