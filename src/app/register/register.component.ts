import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterDto} from "../models/auth.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errors: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notifyService: NotificationService) {
  }

  onSubmit(): void {
    const dto = new RegisterDto(this.form.value);
    this.authService.register(dto).subscribe({
      next: (data) => {
        console.log(data);
        this.errors = [];
      },
      error: (err: HttpErrorResponse) => {
        this.notifyService.showError("Error", err.error.message);
      }
    });
  }
}
