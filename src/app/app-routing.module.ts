import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {VerifyAccountComponent} from "./verify-account/verify-account.component";
import {RegisterComponent} from "./register/register.component";
import {PostsComponent} from "./posts/posts.component";
import {AuthPublicGuard} from "./guards/auth-public.guard";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path: 'register',
    component : RegisterComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/verify-account/:accessToken',
    component: VerifyAccountComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path: 'auth/reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [AuthPublicGuard],
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthPublicGuard],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
