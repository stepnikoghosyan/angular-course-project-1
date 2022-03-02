import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  token = '';
  emailError = false;
  errMessage!: string;
  email = new FormControl('',[Validators.required,Validators.email])
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService) {

  }


  ngOnInit(): void {
    this.getToken();
    this.emailError = false;
  }


  getToken() {
    this.errMessage = '';
    this.activeRoute.params
      .pipe(map((res: any) => {
        this.token = res.token;
        
        localStorage.setItem('token', JSON.stringify(this.token))
      })).subscribe(() => {
        this.authService.verifyAccount(this.token).subscribe(
          () => {
            this.notifyService.showSuccess('Your verification Succeded', 'Succes');
            setTimeout(() => {
              this.router.navigate(['auth/login'])
            }, 1000)

          },()=>{this.notifyService.showError(this.errMessage, 'Error')}
        );
      })

  }


  resendActivation(){
    const email = {
      email: this.email.value
    }

    this.authService.resendActivation(email).subscribe(()=>{
      this.notifyService.showSuccess('Your verification Succeded', 'Succes')
      this.signIn()
    })
  }

  signIn() {
    this.router.navigate(['auth/login'])
  }
  signUp() {
    this.router.navigate(['auth/register'])
  }

  showEmail(){
    this.emailError = true;
  }
}
