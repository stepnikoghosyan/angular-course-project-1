import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from  './app-routing.module'
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'

import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';



@NgModule ({
    declarations: [ AppComponent, LoginComponent, HomeComponent, RegisterComponent,  ],
    imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule],
    providers: [AuthService],
    bootstrap: [AppComponent]
})


export class AppModule { }