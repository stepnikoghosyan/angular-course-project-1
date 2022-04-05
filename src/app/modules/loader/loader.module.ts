import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoaderComponent } from "./ components/loader/loader.component";
import { LoadingSpinnerComponent } from "./ components/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    LoaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    LoadingSpinnerComponent
  ]
})
export class LoaderModule {
}
