import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  form: FormGroup = this.fb.group ({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  login() {
    const login = new Login(this.form.value);
    this.authService.login(login).subscribe;
  }
}
