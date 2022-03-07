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
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule,} from '@angular/material/icon';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TostringPipe } from './tostring.pipe';
import { AuthGuard } from './auth.guard';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AuthPublicGuard } from './auth-public.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptor } from './token.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
    NotFoundComponent,
    
  
  
  
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
   MatProgressSpinnerModule,
   BrowserAnimationsModule,
  ],

  
  providers: [AuthService,AuthGuard,AuthPublicGuard, 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    },
     {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
      },

  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
