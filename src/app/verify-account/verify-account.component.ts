import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmailDto } from '../models/auth.model';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
    showResendSpinner = false;
    showSpinner = false;
    showTitle = true;
    showResendEmailForm = false;

    @ViewChild ('resendButton') resendButton!: ElementRef<HTMLButtonElement>;
    
    verifyForm : FormGroup = this.formBuilder.group({
        email :['', [ Validators.required, Validators.email]], 
    });

    constructor(
        private actacatedRoute:ActivatedRoute,
        private authService:AuthService,
        private router:Router, 
        private formBuilder:FormBuilder,
        private notifyService: NotificationService
    ) {};

    ngOnInit(): void {
      this.showSpinner = true;
      const activationToken = this.actacatedRoute.snapshot.params['activationToken'];
      if (activationToken) {
        this.authService.verifyAccount(activationToken).subscribe({
            next:() => {
                this.notifyService.success("Account verified", "Success")
                this.router.navigateByUrl('login');
            },
            error :(err: HttpErrorResponse) => {
                console.log(err)
                this.notifyService.error("Invalid activation token", "Error");
                this.showTitle = false;
                this.showSpinner = false;
                this.resendButton.nativeElement.style.backgroundColor = "#183d40";
            }
        });
      } 
    };

    onClick() {
        this.showResendEmailForm = true;
        this.resendButton.nativeElement.style.backgroundColor = "gray";
    };

    sendEmail() {
        console.log("test!");
        if(this.verifyForm.valid){
            this.showResendSpinner = true;
            const dto = new EmailDto(this.verifyForm.value);
            this.authService.resendActivationToken(this.verifyForm.value).subscribe({
                next: ()=>{
                    this.notifyService.success("Please check your email", "Success!!");
                    this.showResendSpinner = false;
                },
                error: (err: HttpErrorResponse)=> {
                    if(err.status == 409){

                        this.notifyService.error("Account is already verified", "Error");
                        this.showResendSpinner = false;
                        this.showTitle = false; 
                    }
                }
            });
        }
    };
}