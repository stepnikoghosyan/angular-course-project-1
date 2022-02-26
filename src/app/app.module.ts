import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordService } from './services/reset-password.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import {VerifyAccountComponent} from './verify-account/verify-account.component';
import {SharedModule} from "./shared.module";
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    LoadingComponent,
    VerifyAccountComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ResetPasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
