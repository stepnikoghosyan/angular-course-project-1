import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/notification-service/notification.service';



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
        error: (err: HttpErrorResponse) => {
          this.notifyService.showError(err.error.message, 'Error');
          this.isLoading = false;
        }
      }
      );
  }

  resendActivation() {
    const email = {email: this.email.value};
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
