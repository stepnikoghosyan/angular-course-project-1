import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginDto } from './models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  form : FormGroup = this.formBuilder.group({
    email :[''],
    password :[''],
  })

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService) { }

    onSubmit() {
      const dto = new LoginDto(this.form.value)
      this.authService.login(dto).subscribe({
        next:(data) => {
          console.log(data);
        }
      })

    }
}
