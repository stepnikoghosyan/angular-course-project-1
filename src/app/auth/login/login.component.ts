import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: AuthService) { }

  userData = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  get email() {
    return this.userData.get('email')
  }

  get password() {
    return this.userData.get('password')
  }
 

  login() {
    const login = {
      email: this.email!.value,
      password: this.password!.value
    }
    if(this.userData.valid) {
      this.loginService.postLogin(login).subscribe((result) => {
        console.log(result)
      })
    } 
    
  }
  
  
  ngOnInit(): void {
  }

}
