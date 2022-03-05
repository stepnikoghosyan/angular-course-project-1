import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
import { RegisterDto } from '../models/auth.model';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';



@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  showSpinner= false
  showEmail = false
  showButtons = false
  showError = false
  showSuccess = false  

  @Output('reSend')
  event = new EventEmitter()
  
  form : FormGroup = this.formBuilder.group({
    email :['',[Validators.required,Validators.email]], 
  })


  constructor(
    private actacatedRoute:ActivatedRoute,
     private authService:AuthService,
     private router:Router, 
     private formBuilder:FormBuilder,

     ) {}


    ngOnInit(): void {
      this.showSpinner = true;
      const activationToken = this.actacatedRoute.snapshot.params['activationToken'];
      if (activationToken) {
        this.authService.verifyAccount(activationToken).subscribe({
          next:() => {
            this.showSuccess=true
            this.router.navigateByUrl('login');

          },
         error :() => {
           this.showError=true  
         }
        });
      } 
    }


    onClick() {
    this.showSpinner=false
    this.showEmail = true
    this.showButtons = true
    this.event.emit()
    }

    sendEmail() {
      console.log("test!");
      console.log(this.form.value.email);
      
     return this.authService.resendActivationToken(this.form.value).subscribe()
    }


}