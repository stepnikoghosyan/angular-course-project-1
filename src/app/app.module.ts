import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { VerifyAccountComponent } from './auth/verify-account/verify-account.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { CardComponent } from './posts/card/card.component';
import { CardFooterComponent } from './posts/card-footer/card-footer.component';
import { TokenInterceptor } from './token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from './loading/loading.component';
import { DotsPipe } from './dots.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    PostsComponent,
    AuthComponent,
    ProfileComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    HeaderComponent,
    RegisterComponent,
    NotFoundComponent,
    CardComponent,
    CardFooterComponent,
    LoadingComponent,
    DotsPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,

    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
