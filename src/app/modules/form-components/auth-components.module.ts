import {NgModule} from "@angular/core";
import {PasswordComponent} from "./ components/password/password.component";
import {EmailComponent} from "./ components/email/email.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PasswordComponent,
    EmailComponent
  ],
  exports: [
    PasswordComponent,
    EmailComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
})
export class AuthComponentsModule {
}
