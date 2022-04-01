import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user: UserModel | null;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.profileDataChanged();
  }

  onLogout(e: MouseEvent): void {
    e.preventDefault();
    this.authService.logout();
  }

  navigateToMyPosts() {
    this.router.navigate(['posts'], {
      queryParams: {
        user: this.user?.id
      }
    });
  }
  
  profileDataChanged(): void {
    this.userService.pictureChanged.subscribe(data=> {
      this.user = data;
    });
  }
}
