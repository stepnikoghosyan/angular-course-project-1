import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { DotsPipe } from './dots.pipe';



@NgModule({
  
  declarations: [
    LoadingComponent,
    CardComponent,
    CardFooterComponent,
    DotsPipe,
    HeaderComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule,
    
  ],

  exports: [
    LoadingComponent,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    HeaderComponent,
    CardComponent,
    CardFooterComponent,
    DotsPipe,
  ]
})
export class SharedModule { }
