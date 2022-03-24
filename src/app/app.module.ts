import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { MainModule } from './modules/main/main.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainGuard } from './guards/main.guard';

@NgModule({
  declarations: [
    AppComponent,

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MainModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers:[MainGuard],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
