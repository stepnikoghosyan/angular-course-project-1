import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent{

  constructor(private authService: AuthService) { }
  
    onLogOut(){
       this.authService.logOut()
    }
   


}
