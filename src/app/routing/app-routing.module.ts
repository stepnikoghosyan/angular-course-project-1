import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component'
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { VerifyAccountComponent } from '../auth/verify-account/verify-account.component';
import { HomeComponent } from '../home/home.component';
import { PostsComponent } from '../posts/posts.component';
import { UsersComponent } from '../users/users.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {path:'auth/register', component:RegisterComponent},
  {path:'auth/forgot-password', component: ForgotPasswordComponent},
  {path:'auth/reset-password', component: ResetPasswordComponent},
  {path:'auth/verify-account/:token', component: VerifyAccountComponent},
  {path:'auth/reset-password/:token', component: ResetPasswordComponent},
  {path:'auth/login', component:LoginComponent},

  {path:'home', component: HomeComponent,canActivate:[AuthGuard]},
  {path:'users', component: UsersComponent,canActivate:[AuthGuard]},
  {path:'posts', component:PostsComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
