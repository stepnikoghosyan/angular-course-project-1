import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { RegisterDto } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  unSubscribe$ = new Subject<void>();

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  message = '';
  successMsg = '';
  isLoading = false;
  showPassword = true;
  inputType = 'password';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }


  showHidePass() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inputType = 'password';
    } else {
      this.inputType = 'text';
    }
  }

  register() {
    if (this.form.valid) {
      this.isLoading = true;
      const registerDto = new RegisterDto(this.form.value);
      this.authService.register(registerDto)
        .pipe(takeUntil(this.unSubscribe$))
        .subscribe(
          {
            error: ((err: HttpErrorResponse) => {
              this.isLoading = false;
              this.message = err.error.message;
            })
          }
        );
    } else {
      this.message = 'Please fill all fields';
    }

  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
