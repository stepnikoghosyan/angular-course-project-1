import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RegisterDto } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  unSubscribe$ = new Subject<void>();

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })

  message = '';
  successMsg = '';
  isLoader = false;
  showPassword = true;
  text = 'password'

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.successMsg = '';
  }

  showHidePass() {
    this.showPassword = !this.showPassword
    if (this.showPassword) {
      this.text = 'password'
    } else {
      this.text = 'text'
    }
  }

  register() {
    if (this.form.valid) {
      this.isLoader = true
      const register = new RegisterDto(this.form.value);
      this.authService.register(register)
        .pipe(takeUntil(this.unSubscribe$))
        .subscribe(() => {
          this.isLoader = false
          this.notifyService.showSuccess('Please check your email for verification', 'Success')
          this.router.navigate(['auth/login'])
        },
          ((err: any) => {
            this.isLoader = false
            this.message = err.error.message
          }));
    } else {
      this.message = 'Please fill all fields';
      return
    }

  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();

  }
}
