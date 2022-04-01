import { Component, OnInit } from '@angular/core';
import { INavItem } from '../../models/nav-item.model';
import { getNavigationItems } from '../../configs/navigation-Items.config';
import { GetUserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    navItems!: INavItem[];
    myProfileInfo?: GetUserModel;

    constructor(
        private userService: UsersService,
        private authService: AuthService) { }

    ngOnInit(): void {
        this.myProfileInfo = this.userService.myProfile;
        this.navItems = getNavigationItems();
        console.log("NAVITEMS", this.navItems)
    }
    
    onImageError(): void {
       this.myProfileInfo!.profilePictureUrl = "../../assets/images/user_image.jpg"
    }
    onLogOut() {
        this.authService.logout();
    }
}
