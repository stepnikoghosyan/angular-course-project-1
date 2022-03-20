import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {AuthPublicGuard} from "../../guards/auth-public.guard";
import {RegisterComponent} from "./components/register/register.component";
import {VerifyAccountComponent} from "./components/verify-account/verify-account.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {AuthComponent} from "./auth.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthPublicGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthPublicGuard]
      },
      {
        path: 'verify-account/:accessToken',
        component: VerifyAccountComponent,
        canActivate: [AuthPublicGuard]
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
        canActivate: [AuthPublicGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [AuthPublicGuard],
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
