import { Component} from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotDto } from 'src/app/models/auth.model';

@Component({
  selector: 'app-forgot-passvord',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-passvord.component.scss']
})
export class ForgotPasswordComponent {
  isLoading = false;
  isTouched = false;
  errMessage = '';
  unSubscribe = new Subject();
  constructor(
    private authService: AuthService,
    ) { }


  email = new FormControl('', [Validators.required, Validators.email]);

  sendEmail() {
    this.isTouched = true;
    if (this.email.valid) {
      this.isLoading = true;
      this.errMessage = '';
      const email = {email: this.email.value};
      this.authService.forgotPassword(email).pipe(takeUntil(this.unSubscribe)).
        subscribe(
          () => this.isLoading = false
        )
    }
  }

}
