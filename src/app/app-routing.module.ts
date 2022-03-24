import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from './guards/main.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: "",
        loadChildren: ()=> import("./modules/auth/auth.module").then(m => m.AuthModule),
    },
    {
        path: "main", 
        loadChildren: ()=> import("./modules/main/main.module").then(m => m.MainModule),
        canLoad: [ MainGuard ]
    },
    {
        path:"**",
        component: NotFoundComponent
    }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
