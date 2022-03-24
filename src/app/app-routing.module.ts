import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from './guards/main.guard';

const routes: Routes = [
  
    {
        path: "main", 
        loadChildren: ()=> import("./modules/main/main.module").then(m => m.MainModule),
        canLoad: [ MainGuard ]
    },
    {
        path: "",
        loadChildren: ()=> import("./modules/auth/auth.module").then(m => m.AuthModule),
    },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
