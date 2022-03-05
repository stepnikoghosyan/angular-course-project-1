import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "./shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {VerifyAccountComponent} from "./verify-account/verify-account.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

@NgModule({
  declarations: [
    ResetPasswordComponent,
    VerifyAccountComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    ResetPasswordComponent,
    VerifyAccountComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    SharedModule
  ]
})
export class AuthModule {
}
