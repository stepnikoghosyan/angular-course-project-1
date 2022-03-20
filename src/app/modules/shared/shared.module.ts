import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {LoaderComponent} from './ components/loader/loader.component';
import {LoadingSpinnerComponent} from "./ components/loading-spinner/loading-spinner.component";
import {FormsModule} from "@angular/forms";
import { FullNamePipe } from './pipes/full-name.pipe';
import { ImageUrlPipe } from './pipes/image-url.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    LoadingSpinnerComponent,
    ImageUrlPipe,
    FullNamePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    LoadingSpinnerComponent,
    ImageUrlPipe,
    FullNamePipe
  ]
})
export class SharedModule {
}
