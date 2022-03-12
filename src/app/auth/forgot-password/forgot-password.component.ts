import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forgot-passvord',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-passvord.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  IsLoading = false;
  isTouched = false;
  errMessage!: string;
  unSubscribe = new Subject();
  constructor(private router: Router, private authService: AuthService, private notifyService: NotificationService) { }
  

  email = new FormControl('', [Validators.required, Validators.email]);

  sendEmail() {
    this.isTouched = true;
    if(this.email.valid) {
      this.IsLoading = true;
      this.errMessage = '';
      const forgot = {email: this.email.value}
      this.authService.forgotPassword(forgot).pipe(takeUntil(this.unSubscribe)).
      subscribe(() => {
        this.router.navigate(['/home']);
        this.notifyService.showSuccess('Your password was successfully reseted', 'success');
      },
      (err) => {
        this.errMessage = err.error.message;
        this.IsLoading = false;
      }
      )
  }
}

  signIn() {
    this.router.navigate(['auth/login']);
  }
  signUp() {
    this.router.navigate(['auth/register']);
  }



  ngOnInit(): void {
  }

}
