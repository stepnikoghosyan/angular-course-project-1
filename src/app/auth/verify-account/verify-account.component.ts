import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  token = '';
  emailError = false;
  email = new FormControl('',[Validators.required,Validators.email])
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

  }


  ngOnInit(): void {
    this.getToken();
    this.emailError = false;
  }

  showSuccess() {
    this.toastr.success('Account verified', 'Succes', { timeOut: 2000 });
  }

  showErrore() {
    this.toastr.error('invalid activation token', 'Error', { timeOut: 2000 })
  }

  getToken() {

    this.activeRoute.params
      .pipe(map((res: any) => {
        this.token = res.token;
        
        localStorage.setItem('token', JSON.stringify(this.token))
      })).subscribe(() => {
        this.authService.verifyAccount(this.token).subscribe(
          () => {
            this.showSuccess();
            setTimeout(() => {
              this.router.navigate(['auth/login'])
            }, 1000)

          },()=>{this.showErrore()}
        );
      })

  }


  resendActivation(){
    const email = {
      email: this.email.value
    }

    this.authService.resendActivation(email).subscribe(()=>{
      this.showSuccess()
      this.signIn()
    })
  }

  signIn() {
    this.router.navigate(['auth/login'])
  }
  signUp() {
    this.router.navigate(['auth/register'])
  }

  showEmail(){
    this.emailError = true;
  }
}
