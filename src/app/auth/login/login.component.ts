import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })


  errorMsg = '';
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.errorMsg = '';
  }


  login() {
    const login = new Login(this.form.value);
    this.authService.login(login).subscribe(
      () => {

       //  this.router.navigate(['/home'])

       
      }, (error: any) => {
        this.errorMsg = error.error.message;
      });
  }
}
