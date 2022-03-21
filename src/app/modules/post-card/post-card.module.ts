import {NgModule} from "@angular/core";
import {PostCardComponent} from "./components/post-card/post-card.component";
import {PostCardFooterComponent} from "./components/post-card-footer/post-card-footer.component";
import {PostContainerComponent} from "./components/post-container/post-container.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    PostCardComponent,
    PostCardFooterComponent,
    PostContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    PostCardComponent,
    PostCardFooterComponent,
    PostContainerComponent,
    SharedModule
  ]
})
export class PostCardModule {
}
