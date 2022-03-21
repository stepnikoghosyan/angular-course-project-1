import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {PostCardModule} from "../post-card/post-card.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    PostCardModule
  ],
  exports: []
})
export class HomeModule {
}
