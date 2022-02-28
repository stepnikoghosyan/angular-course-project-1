import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDto} from "../models/auth.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

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
  public isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notifyService: NotificationService,
              private router: Router) {
  }

  onSubmit(): void {
    const dto = new LoginDto(this.form.value);
    this.isLoading = true;
    this.authService.login(dto).subscribe({
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.notifyService.showError("Error", err.error.message);
      }, next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/home');
      }
    })
  }

  togglePass(): void {
   this.showPass = !this.showPass;
  }
}
