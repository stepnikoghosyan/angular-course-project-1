import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  form: FormGroup = this.fb.group ({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(5)]
  })
  


  constructor(private authService: AuthService, private fb: FormBuilder) { }

  register() {
    const register = new Register(this.form.value);
    this.authService.register(register).subscribe();
    console.log(123);
    
  }
  
    
}
