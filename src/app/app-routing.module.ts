import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
const routes: Routes = [{ path: 'auth/reset-password/:token', component: ResetPasswordComponent }]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }