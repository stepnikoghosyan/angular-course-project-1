import {NgModule} from '@angular/core';
import {ImageUrlPipe} from "./image-url.pipe";
import {FullNamePipe} from "./full-name.pipe";

@NgModule({
  declarations: [
    ImageUrlPipe,
    FullNamePipe,
  ],
  imports: [],
  exports: [
    ImageUrlPipe,
    FullNamePipe,
  ]
})
export class PipesModule {
}
