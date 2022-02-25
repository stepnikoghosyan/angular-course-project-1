import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRegisterComponent } from '../auth/auth-register/auth-register.component';
import { AuthComponent } from '../auth/auth.component';
import { ForgotPassvordComponent } from '../auth/forgot-passvord/forgot-passvord.component';
import { ResetPassvordComponent } from '../auth/reset-passvord/reset-passvord.component';
import { VerifyAccountComponent } from '../auth/verify-account/verify-account.component';
import { HomeComponent } from '../home/home.component';
import { PostsComponent } from '../posts/posts.component';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
  {path:'auth/auth-login', component:AuthComponent},
  {path:'auth/auth-register', component:AuthRegisterComponent},
  {path:'auth/forgot-passvord', component: ForgotPassvordComponent},
  {path:'auth/reset-passvord', component: ResetPassvordComponent},
  {path:'auth/verify-account', component: VerifyAccountComponent},
  {path:'home', component: HomeComponent},
  {path:'users', component: UsersComponent},
  {path:'posts', component:PostsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
