import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  user: UserModel | null;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.subscribeToProfilePictureChange();
  }

  onLogout(e: MouseEvent): void {
    e.preventDefault();
    this.authService.logout();
  }

  navigateToMyPosts() {
    this.router.navigate(['posts'], {
      queryParams: {
        user: this.user?.id,
        page: 1
      }
    });
  }

  subscribeToProfilePictureChange(): void {
    this.userService.pictureChanged
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        this.user = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
