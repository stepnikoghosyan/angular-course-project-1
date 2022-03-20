import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "../shared/shared.module";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {VerifyAccountComponent} from "./components/verify-account/verify-account.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {PasswordComponent} from "./components/password/password.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    ForgotPasswordComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule
  ],
  exports: [
  ]
})
export class AuthModule {
}
