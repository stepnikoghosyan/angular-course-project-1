import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { registerDto } from '../models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    firstName: [""],
    lastName: [""],
    email: [""],
    password: [""]
  })

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    
    const dto = new registerDto(this.form.value);
    this.authService.register(dto).subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }

}
