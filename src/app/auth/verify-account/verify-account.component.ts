import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  unSubscribe$ = new Subject<void>();
  token = '';
  emailError = false;
  IsLoading = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) {}
 

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
          this.IsLoading = false;
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.notifyService.showError(err.error.message, 'Error');
        this.IsLoading = false;
      }
    }
    );
  }

  resendActivation() {
    const email = {
      email: this.email.value,
    };

    this.authService.resendActivation(email)
    .pipe(takeUntil(this.unSubscribe$))
    .subscribe(() => {
      this.notifyService.showSuccess('Your verification Succeded', 'Succes');
      this.signIn();
    });
  }

  signIn() {
    this.router.navigate(['auth/login']);
  }
  signUp() {
    this.router.navigate(['auth/register']);
  }

  showEmail() {
    this.emailError = true;
  }

  ngOnDestroy(): void {
   this.unSubscribe$.next();
   this.unSubscribe$.complete();
  }
}
