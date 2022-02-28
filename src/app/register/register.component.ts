import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterDto} from "../models/auth.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {take} from "rxjs";

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

  public isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notifyService: NotificationService,
              private router: Router) {
  }

  onSubmit(): void {
    const dto = new RegisterDto(this.form.value);
    this.isLoading = true;
    this.authService.register(dto).pipe(take(1)).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.router.navigateByUrl('/login');
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.notifyService.showError("Error", err.error.message);
      }
    });
  }
}
