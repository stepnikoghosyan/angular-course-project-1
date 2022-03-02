import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

const routes: Routes = [
    {
      path:'login',
      component:LoginComponent,
      canActivate:[AuthGuard]
    },
    {
      path:'register',
      component:RegisterComponent,
      canActivate:[AuthGuard]
    },
    {
      path:'auth/verify-account/:activationToken',
      component: VerifyAccountComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
