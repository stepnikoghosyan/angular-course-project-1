import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoaderComponent} from './loader/loader.component';
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    LoaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {
}
