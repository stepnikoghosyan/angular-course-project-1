import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCaretDown=faCaretDown;
  isMenu = false;
  currentUser: any;
  constructor(private router: Router, private userService: UsersService) { 
    this.currentUser = this.userService.currentProfile
  }

  ngOnInit(): void {
    
  }
  
  
  showMenu(){
    this.isMenu = !this.isMenu
  }

  logout () {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
    this.router.navigateByUrl('/auth/login');
    this.userService.currentProfile = null;
  }

 }
