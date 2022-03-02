import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Forgot } from 'src/app/models/auth.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-passvord',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-passvord.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  isTouched = false;
  errMessage!: string;
  constructor(private router: Router, private authService: AuthService, private notifyService: NotificationService) { }
  

  email = new FormControl('', [Validators.required, Validators.email])

  sendEmail() {
    this.isTouched = true;
    // const forgot = new Forgot(this.email.value)
    if(this.email.valid) {
      this.errMessage = '';
      const forgot = {email: this.email.value}
      this.authService.forgotPassword(forgot).subscribe(() => {
        this.router.navigate(['/home'])
      },
      (err) => {
        
      }
      )
  }
}

  signIn() {
    this.router.navigate(['auth/login'])
  }
  signUp() {
    this.router.navigate(['auth/register'])
  }



  ngOnInit(): void {
  }

}
