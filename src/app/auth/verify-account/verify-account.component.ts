import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  token = '';
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {

    this.getToken();

  }

  getToken() {
    this.activeRoute.params
      .pipe(debounceTime(1000),map((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token)
      })).subscribe(() => {
        this.authService.verifyAccount(this.token);
      
        
          this.router.navigate(['auth/login'])
        
        
      })

  }

}
