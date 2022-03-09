import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { AuthInterceptor } from './interceptors/token.interceptor';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { CardFooterComponent } from './posts/card-footer/card-footer.component';
import { UserNamePipe } from './pipes/user-name.pipe';




@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    VerifyAccountComponent,
    NotFoundComponent,
    PostsComponent,
    MainComponent,
    HeaderComponent,
    UsersComponent,
    PostCardComponent,
    CardFooterComponent,
    UserNamePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
