import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotDto } from 'src/app/models/auth.model';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  unSubscribe$ = new Subject<void>();
  token = '';
  emailError = false;
  isLoading = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) { }


  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    const token = this.activeRoute.snapshot.paramMap.get('token') as string;
    this.authService.verifyAccount(token)
      .pipe((takeUntil(this.unSubscribe$)))
      .subscribe({
        next: () => {
          this.notifyService.showSuccess('Your verification Succeded', 'Succes');
          setTimeout(() => {
            this.router.navigate(['auth/login']);
            this.isLoading = false;
          }, 3000);
        },
        error: (err: HttpErrorResponse) => {
          this.notifyService.showError(err.error.message, 'Error');
          this.isLoading = false;
        }
      }
      );
  }

  resendActivation() {
    const email = new ForgotDto(this.email.value);
    this.authService.resendActivation(email)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.notifyService.showError(err.error.message, 'Error');
          this.isLoading = false;
        }
      });

  }


  showEmail() {
    this.emailError = true;
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
