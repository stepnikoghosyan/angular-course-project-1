import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {LoginDto} from "../models/auth.model";
import {HttpErrorResponse} from "@angular/common/http";

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
  errors: string[] = [];
  showPass: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  onSubmit(): void {
    this.errors = [];
    const dto = new LoginDto(this.form.value);
    this.authService.login(dto).subscribe(
      {
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 400:
              this.errors = err.error.message;
              break;
            case 401:
            case 403:
              this.errors.push('Email is already exists.');
              break;
            default:
              this.errors.push("Something went wrong.");
          }
        }
      })
  }

  togglePass(): void {
   this.showPass = !this.showPass;
  }
}
