import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
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
  }

  getToken() {
    const token = this.activeRoute.snapshot.paramMap.get('token') as string;
    localStorage.setItem('token', JSON.stringify(token));

    this.authService.verifyAccount(token)
    .pipe((takeUntil(this.unSubscribe$)))
    .subscribe(
      () => {
        this.notifyService.showSuccess('Your verification Succeded', 'Succes');
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 3000);
      },
      () => {
        this.notifyService.showError(this.errMessage, 'Error');
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
