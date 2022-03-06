import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDto } from 'src/app/models/auth.model';
import { Router } from '@angular/router';
import { Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  unSubscribe$  = new Subject<void>();
  showPassword = true;
  text = 'password'

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern( /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    checkBox:[false]
  })


  errorMsg = '';
  isLoader!: boolean
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router:Router
  ) { }
 
  ngOnInit(): void {
    this.showPassword = true;
    this.errorMsg = '';
    this.rememberTocken()
  }

  showHidePass() {
    this.showPassword = !this.showPassword
    if (this.showPassword) {
      this.text = 'password'
    } else {
      this.text = 'text'
    }
  }

  
  rememberTocken(){
     this.form.get('checkBox')?.valueChanges
     .subscribe((result:boolean)=>{
       this.authService.isRemember = result
     })
  }

  login() {
    if(this.form.valid) {
      this.isLoader = true;
      const login = new LoginDto(this.form.value);
      this.authService.login(login)
      .subscribe(
        () => {
        
        }, (error: any) => {
          this.errorMsg = error.error.message;
          this.isLoader = false
        });
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
