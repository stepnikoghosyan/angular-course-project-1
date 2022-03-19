import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PasswordComponent } from './password/password.component';
import { FormsModule } from "@angular/forms";
import { PostCardComponent } from './posts/post-card/post-card.component';
import { PostCardFooterComponent } from './posts/post-card-footer/post-card-footer.component';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { FullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    LoadingSpinnerComponent,
    PasswordComponent,
    PostCardComponent,
    PostCardFooterComponent,
    ImageUrlPipe,
    FullNamePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoaderComponent,
    LoadingSpinnerComponent,
    PasswordComponent,
    PostCardComponent,
    PostCardFooterComponent,
    ImageUrlPipe,
    FullNamePipe
  ]
})
export class SharedModule {
}
