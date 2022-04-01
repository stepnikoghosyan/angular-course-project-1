import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCaretDown=faCaretDown;
  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
  }
  
  logout () {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
    this.router.navigateByUrl('/auth/login');
    this.userService.currentProfile = null;
  }

 }
