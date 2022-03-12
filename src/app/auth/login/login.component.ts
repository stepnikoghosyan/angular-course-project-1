import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDto } from 'src/app/models/auth.model';
import { Router } from '@angular/router';
import { Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  unSubscribe$  = new Subject<void>();
  showPassword = true;
  inutType = 'password';

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern( /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', Validators.required],
    checkBox:[false]
  })


  errorMsg = '';
  IsLoading = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router:Router
  ) { }
 
  ngOnInit(): void {
    this.showPassword = true;
    this.errorMsg = '';
    this.rememberToken();
  }

  showHidePass() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inutType = 'password';
    } else {
      this.inutType = 'text';
    }
  }

  
  rememberToken(){
     this.form.get('checkBox')?.valueChanges.pipe(takeUntil(this.unSubscribe$))
     .subscribe((result:boolean)=>{
       this.authService.isRemember = result
     })
  }

  login() {
    if(this.form.valid) {
      this.IsLoading = true;
      const login = new LoginDto(this.form.value);
      this.authService.login(login).pipe(takeUntil(this.unSubscribe$))
      .subscribe((res) => {
        
        if(this.form.get('checkBox')?.value) {
          localStorage.setItem('auth', res.accessToken);
        } else {
          sessionStorage.setItem('auth', res.accessToken);
        }
        this.router.navigate(['/home']);
      }
        , (error: any) => {
          this.errorMsg = error.error.message;
          this.IsLoading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
