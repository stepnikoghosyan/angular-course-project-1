import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoaderComponent} from './loader/loader.component';
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import { PasswordComponent } from './password/password.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoaderComponent,
    LoadingSpinnerComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
    exports: [
        LoaderComponent,
        LoadingSpinnerComponent,
        PasswordComponent
    ]
})
export class SharedModule {
}
