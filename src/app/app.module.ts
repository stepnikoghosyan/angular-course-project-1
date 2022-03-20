import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './components/main/main.component';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthPublicGuard} from './guards/auth-public.guard';
import {AuthGuard} from './guards/auth.guard';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {PostsService} from "./modules/posts/services/posts.service";
import {AuthService} from "./modules/auth/services/auth.service";
import {appInitializer} from "./interceptors/app-initializer.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
