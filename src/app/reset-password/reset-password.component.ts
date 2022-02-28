import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, Subject, takeUntil} from 'rxjs';
import {ResetPassword} from '../models/reset-password.model';
import {AuthService} from "../services/auth.service";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public passwordForm!: FormGroup;
  public errorMessage!: string;
  public isShowPassword: boolean = false;
  public isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private notifyService: NotificationService) {
  }

  ngOnInit(): void {
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
      this.errorMessage = '';
      this.passwordForm.disable();
      const token = this.activatedRoute.snapshot.params['token'];
      const sendObject: ResetPassword = {
        token: token,
        newPassword: this.passwordForm.value.newPassword
      }
      this.authService.resetPassword(sendObject).pipe(takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
          this.passwordForm.enable()
        }),
      )
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/home');
          },
          error: (err) => {
            this.notifyService.showError("Error", err.error.message);
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
