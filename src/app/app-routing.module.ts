import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthPublicGuard } from "./auth-public.guard";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthGuard } from "./guards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { VerifyAccountComponent } from "./verify-account/verify-account.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/verify-account/:access-token',
    component: VerifyAccountComponent
  },
  {
    path: 'auth/reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthPublicGuard],
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
