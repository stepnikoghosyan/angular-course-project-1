import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { VerifyAccountComponent } from '../auth/verify-account/verify-account.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
  ],
  imports: [
    LoadingModule,
    CommonModule,
    ToastrModule.forRoot(),  
    AuthRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
})
export class AuthModule { }
