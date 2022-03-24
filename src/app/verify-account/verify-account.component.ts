import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmailDto } from '../models/auth.model';
import { finalize, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
    private subscription$ = new Subject<void>()
    showResendSpinner = false;
    showSpinner = false;
    showTitle = true;
    showResendEmailForm = false;

    verifyForm : FormGroup = this.formBuilder.group({
        email :['', [ Validators.required, Validators.email]], 
    });

    constructor(
        private activatedRoute:ActivatedRoute,
        private authService:AuthService,
        private formBuilder:FormBuilder,
        private notifyService: NotificationService
    ) {};

    ngOnInit(): void {
      this.showSpinner = true;
      const activationToken = this.activatedRoute.snapshot.params['activationToken'];
      if (activationToken) {
      this.authService.verifyAccount(activationToken)
            .subscribe({
                error :(err: HttpErrorResponse) => {
                    this.notifyService.error("Invalid activation token", "Error");
                    this.showTitle = false;
                    this.showSpinner = false;
                }
            });
        } 
    };

    onClick() {
        this.showResendEmailForm = true;
    };

    sendEmail() {
        this.showResendSpinner = true;
        if(this.verifyForm.valid){
            const dto = new EmailDto(this.verifyForm.value);
            this.authService.resendActivationToken(this.verifyForm.value)
            .pipe(
                finalize(()=>{
                    this.showSpinner = false;
                    this.showTitle = false; 
                })
            )
            .subscribe({
                next: ()=>{
                    this.notifyService.success("Please check your email", "Success!!");
                },
                error: (err: HttpErrorResponse)=> {
                    if(err.status == 409){
                        this.notifyService.error("Account is already verified", "Error");
                    }
                }
            });
        }
    };

    ngOnDestroy(): void {
        this.subscription$.next()
        this.subscription$.complete()
    }
}