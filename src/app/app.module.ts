import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth/auth-register/auth-register.component';
import { ForgotPassvordComponent } from './auth/forgot-passvord/forgot-passvord.component';
import { ResetPassvordComponent } from './auth/reset-passvord/reset-passvord.component';
import { VerifyAccountComponent } from './auth/verify-account/verify-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    PostsComponent,
    AuthComponent,
    ProfileComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    ForgotPassvordComponent,
    ResetPassvordComponent,
    VerifyAccountComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
