import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';

import { ForgotPasswordComponent } from 'src/app/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { ResetPasswordComponent } from 'src/app/reset-password/reset-password.component';
import { PasswordComponent } from 'src/app/password/password.component';
import { VerifyAccountComponent } from 'src/app/verify-account/verify-account.component';

import { AuthInterceptor } from 'src/app/interceptors/token.interceptor';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
      ForgotPasswordComponent,
      LoginComponent,
      RegisterComponent,
      ResetPasswordComponent,
      PasswordComponent,
      VerifyAccountComponent,
      AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ToastrModule,
    MatProgressSpinnerModule,
    MatIconModule,

  ]
  })
export class AuthModule { }
