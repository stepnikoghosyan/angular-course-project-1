import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AppRoutingModule} from "./app.routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./auth.service";
import { HomeComponent } from './home/home.component';
import {AuthGuard} from "./auth.guard";
import {AuthPublicGuard} from "./auth-public.guard";
import { VerifyAccountComponent } from './verify-account/verify-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    VerifyAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthService,AuthGuard,AuthPublicGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
