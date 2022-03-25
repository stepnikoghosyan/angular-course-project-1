import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/token.interceptor';
import { MainGuard } from './modules/main/guards/main.guard';


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
