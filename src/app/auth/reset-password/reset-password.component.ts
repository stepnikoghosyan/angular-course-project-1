import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResetDto } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  showPassword = false;
  inputType = 'password';
  errMessage = '';
  isTouched = false;
  isLoading = false;
  unSubscribe$ = new Subject();

  resetForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private notifyService: NotificationService
  ) { }

  resetPassword() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      const token = this.activedRoute.snapshot.paramMap.get('token') as string;

      const resetPass:ResetDto = {
        newPassword: this.resetForm.get('newPassword')?.value,
        token: token,
      }

      this.authService.resetPassword(resetPass, this.isLoading)
        .pipe(takeUntil(this.unSubscribe$))
        .subscribe(
          {
            error: (err: HttpErrorResponse) => {
              this.isLoading = false;
              this.notifyService.showError("Error", err.error.message);
            }
          }
        )
    }
  }

  showHidePass() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inputType = 'password';
    } else {
      this.inputType = 'text';
    }
  }
}
