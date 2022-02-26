import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component'
import { ForgotPassvordComponent } from '../auth/forgot-passvord/forgot-passvord.component';
import { ResetPassvordComponent } from '../auth/reset-passvord/reset-passvord.component';
import { VerifyAccountComponent } from '../auth/verify-account/verify-account.component';
import { HomeComponent } from '../home/home.component';
import { PostsComponent } from '../posts/posts.component';
import { UsersComponent } from '../users/users.component';
import { LoginComponent } from '../auth/login/login.component';

const childRoutes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'users', component: UsersComponent},
  {path:'posts', component:PostsComponent},
]
const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {path:'auth/register', component:RegisterComponent},
  {path:'auth/forgot-passvord', component: ForgotPassvordComponent},
  {path:'auth/reset-passvord', component: ResetPassvordComponent},
  {path:'auth/verify-account', component: VerifyAccountComponent, children:childRoutes},
  {path:'auth/login', component:LoginComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
