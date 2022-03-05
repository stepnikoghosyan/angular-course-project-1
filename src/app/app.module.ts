import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from "./auth.module";

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import {PostsComponent} from './posts/posts.component';
import {PostCardComponent} from './posts/post-card/post-card.component';
import {PostCardFooterComponent} from './posts/post-card-footer/post-card-footer.component';
import {AuthPublicGuard} from './guards/auth-public.guard';
import {AuthGuard} from './guards/auth.guard';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {PostsService} from "./services/posts.service";
import {ImageUrlPipe} from './pipes/image-url.pipe';
import {FullNamePipe} from './pipes/full-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    PostsComponent,
    PostCardComponent,
    PostCardFooterComponent,
    ImageUrlPipe,
    FullNamePipe,
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
