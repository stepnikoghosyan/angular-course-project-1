import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule,} from '@angular/material/icon';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TostringPipe } from './tostring.pipe';
import { AuthGuard } from './auth.guard';
import { NgHttpLoaderModule } from 'ng-http-loader';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    AuthComponent,
    HomeComponent,
    PostsComponent,
    UsersComponent,
    ProfileComponent,
    TostringPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule, 
    NoopAnimationsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
   NgHttpLoaderModule.forRoot(),


    

    
      
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
