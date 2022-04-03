import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPublicGuard } from '../guards/auth-public.guard';
import { AuthGuard } from '../guards/auth.guard';
import { NotFoundComponent } from '../not-found/not-found.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
    canLoad: [AuthPublicGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('../main/main.module').then(m=>m.MainModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
