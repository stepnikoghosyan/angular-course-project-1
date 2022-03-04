import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Register } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  unSubscribe$  = new Subject<void>();

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required,Validators.email, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })

  message = ''
  successMsg = ''

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router:Router,
    private notifyService: NotificationService
  ) { }
 
  ngOnInit(): void {
    this.message= '';
    this.successMsg = '';
  }

  register() {

    if (this.form.invalid) {
      this.message = 'please fill all fields correctly';
      return
    }
    const register = new Register(this.form.value);
    this.authService.register(register)
    .pipe(takeUntil(this.unSubscribe$))
    .subscribe(() => {
      this.notifyService.showSuccess('Your registration was successfully completed,please check your email','Success')
        this.router.navigate(['auth/login'])
    },
      ((err: any) => {
        this.message = err.error.message
      }));

  }

  ngOnDestroy(): void {
   this.unSubscribe$.next();
   this.unSubscribe$.complete();
   
  }
}
