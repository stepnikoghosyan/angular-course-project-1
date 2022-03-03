import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";
import { ResetPasswordDto } from "../models/auth.model";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  passwordForm!: FormGroup;
  isShowPassword = false;
  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifyService: NotificationService) {
    this.initForm();
  }

  initForm(): void {
    this.passwordForm = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  changePasswordType(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  resetPassword(): void {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      this.passwordForm.disable();
      const token = this.activatedRoute.snapshot.params['token'];
      const resetPasswordDto: ResetPasswordDto = new ResetPasswordDto({
        token: token,
        newPassword: this.passwordForm.value.newPassword
      })
      this.authService.resetPassword(resetPasswordDto)
        .pipe(takeUntil(this.unsubscribe$),
          finalize(() => {
            this.isLoading = false;
            this.passwordForm.enable()
          })
        )
        .subscribe({
          next: () => {
            this.showNotifications(true, "Password is changed.");
          },
          error: (err: HttpErrorResponse) => {
            this.showNotifications(false, err.error.message);
          }
        })
    }
  }

  private showNotifications(success: boolean, message: string): void {
    if (success) {
      this.notifyService.showSuccess("Success", message);
      this.router.navigateByUrl('/home');
    } else {
      this.notifyService.showError("Error", message);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
