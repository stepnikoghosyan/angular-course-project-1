import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth.guard";
import {AuthPublicGuard} from "./auth-public.guard";
import {VerifyAccountComponent} from "./verify-account/verify-account.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component : LoginComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path: 'register',
    component : RegisterComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path: 'auth/verify-account/:activationToken',
    component : VerifyAccountComponent,
    canActivate: [AuthPublicGuard],
  },
  {
    path: 'home',
    component : HomeComponent,
    canActivate: [AuthGuard],
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
