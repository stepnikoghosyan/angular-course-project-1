import { Component} from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-passvord',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-passvord.component.scss']
})
export class ForgotPasswordComponent {
  isLoading = false;
  isTouched = false;
  errMessage = '';
  unSubscribe = new Subject();
  constructor(
    private router: Router,
    private authService: AuthService,
    private notifyService: NotificationService) { }


  email = new FormControl('', [Validators.required, Validators.email]);

  sendEmail() {
    this.isTouched = true;
    if (this.email.valid) {
      this.isLoading = true;
      this.errMessage = '';
      const forgot = { email: this.email.value }
      this.authService.forgotPassword(forgot).pipe(takeUntil(this.unSubscribe)).
        subscribe(
          {
            next: () => {
              this.router.navigate(['/home']);
              this.notifyService.showSuccess('Your password was successfully reseted', 'success');
            },
            error: (err:HttpErrorResponse) => {
              this.errMessage = err.error.message;
              this.isLoading = false;
            }
          }
        )
    }
  }

}
