import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from "./auth.module";
import {MainComponent} from './main/main.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import {PostsComponent} from './posts/posts.component';
import {AuthPublicGuard} from './guards/auth-public.guard';
import {AuthGuard} from './guards/auth.guard';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {PostsService} from "./services/posts.service";
import { appInitializerInterceptor } from './interceptors/app-initializer.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    PostsComponent,
    MainComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthPublicGuard,
    AuthGuard,
    PostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    appInitializerInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
