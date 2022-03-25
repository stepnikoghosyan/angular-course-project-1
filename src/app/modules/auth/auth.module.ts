import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';

import { ForgotPasswordComponent } from 'src/app/modules/auth/components/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/components/register/register.component';
import { ResetPasswordComponent } from 'src/app/modules/auth/components/reset-password/reset-password.component';
import { PasswordComponent } from 'src/app/modules/auth/components/password/password.component';
import { VerifyAccountComponent } from 'src/app/modules/auth/components/verify-account/verify-account.component';

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
    MatProgressSpinnerModule,
    MatIconModule,

  ]
  })
export class AuthModule { }
