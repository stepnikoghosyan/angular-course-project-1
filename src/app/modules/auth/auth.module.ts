import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';

import { ForgotPasswordComponent } from 'src/app/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/login/login.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { ResetPasswordComponent } from 'src/app/reset-password/reset-password.component';
import { PasswordComponent } from 'src/app/password/password.component';
import { VerifyAccountComponent } from 'src/app/verify-account/verify-account.component';

import { AuthInterceptor } from 'src/app/interceptors/token.interceptor';


@NgModule({
  declarations: [
      ForgotPasswordComponent,
      LoginComponent,
      NotFoundComponent,
      RegisterComponent,
      ResetPasswordComponent,
      PasswordComponent,
      VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ToastrModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [{
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi:true
      }],
  })
export class AuthModule { }
