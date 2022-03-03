import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AuthPublicGuard} from './guards/auth-public.guard';
import {AuthGuard} from './guards/auth.guard';
import {AuthModule} from "./auth.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {PostsService} from "./services/posts.service";
import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    PostCardComponent
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
