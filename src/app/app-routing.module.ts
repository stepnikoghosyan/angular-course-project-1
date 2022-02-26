import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import { VerifyAccountComponent } from "./verify-account/verify-account.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth/verify-account/:access-token',
    component: VerifyAccountComponent
  },
  { path: 'auth/reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
