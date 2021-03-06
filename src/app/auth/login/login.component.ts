import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginDto } from 'src/app/models/auth.model';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  unSubscribe$ = new Subject<void>();
  showPassword = true;
  inutType = 'password';
  errorMsg = '';
  isLoading = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', Validators.required],
    RememberMe: [false]
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.rememberToken();
  }

  // create component
  showHidePass() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inutType = 'password';
    } else {
      this.inutType = 'text';
    }
  }

  rememberToken() {
    this.form.get('RememberMe')?.valueChanges
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((result: boolean) => {
        this.authService.isRemember = result
      })
  }

  login() {
    if (this.form.valid) {
      this.isLoading = true;
      const loginDto = new LoginDto(this.form.value);
      this.authService.login(loginDto).pipe(takeUntil(this.unSubscribe$))
        .subscribe(() => {
          this.isLoading = false
        });
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
