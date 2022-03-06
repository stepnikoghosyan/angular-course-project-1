import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  unSubscribe$ = new Subject<void>();
  token = '';
  emailError = false;
  errMessage!: string;
  isLoader!: boolean
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) {}
 

  ngOnInit(): void {
    this.getToken();
    this.emailError = false;
    this.isLoader = true;
  }

  getToken() {
    const token = this.activeRoute.snapshot.paramMap.get('token') as string;
    this.authService.verifyAccount(token)
    .pipe((takeUntil(this.unSubscribe$)))
    .subscribe(
      () => {
        this.notifyService.showSuccess('Your verification Succeded', 'Succes');
        setTimeout(() => {
          this.router.navigate(['auth/login']);
          this.isLoader = false
        }, 3000);
      },
      () => {
        this.notifyService.showError(this.errMessage, 'Error');
        this.isLoader = false
      }
    );
  }

  resendActivation() {
    this.isLoader = true
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
    this.isLoader = false
    this.emailError = true;
  }

  ngOnDestroy(): void {
   this.unSubscribe$.next();
   this.unSubscribe$.complete();
  }
}
