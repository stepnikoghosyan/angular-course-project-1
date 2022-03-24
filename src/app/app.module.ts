import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainGuard } from './guards/main.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/token.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [MainGuard,
        {
            provide : HTTP_INTERCEPTORS,
            useClass : AuthInterceptor,
            multi:true
        }],

    bootstrap: [AppComponent]
})
export class AppModule { }
