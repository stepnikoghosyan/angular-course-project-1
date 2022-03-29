import {NgModule} from '@angular/core';
import {ImageUrlPipe} from "./image-url.pipe";
import {FullNamePipe} from "./full-name.pipe";
import {ProfilePicPipe} from "./profile-pic.pipe";

@NgModule({
  declarations: [
    ImageUrlPipe,
    FullNamePipe,
    ProfilePicPipe
  ],
  imports: [],
  exports: [
    ImageUrlPipe,
    FullNamePipe,
    ProfilePicPipe
  ]
})
export class PipesModule {
}
