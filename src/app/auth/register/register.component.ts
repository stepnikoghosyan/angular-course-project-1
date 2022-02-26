import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegister = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  get fisrtName() {
    return this.userRegister.get('firstName')
  }
  get lastName() {
    return this.userRegister.get('lastName')
  }
  get email() {
    return this.userRegister.get('email')
  }
  get password() {
    return this.userRegister.get('password')
  }

  constructor(private registerService: AuthService) { }

  register() {
    const register = {
      email: this.email!.value,
      password: this.password!.value,
      firstName: this.fisrtName!.value,
      lastName: this.lastName!.value
    }
    if(this.userRegister.valid) {
      this.registerService.register(register).subscribe()
    }
    
  }

  ngOnInit(): void {
  }

}
