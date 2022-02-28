import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDto} from "../models/auth.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: ['']
  });
  showPass: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notifyService: NotificationService) {
  }

  onSubmit(): void {
    const dto = new LoginDto(this.form.value);
    this.authService.login(dto).subscribe({
      error: (err: HttpErrorResponse) => {
        this.notifyService.showError("Error", err.error.message);
      }
    })
  }

  togglePass(): void {
   this.showPass = !this.showPass;
  }
}
