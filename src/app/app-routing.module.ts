import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthPublicGuard } from './auth-public.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Route[] = [
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthPublicGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
