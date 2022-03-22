import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { ResendActivationTokenDto } from '../module/pages';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  errorMessage:string ="";
  constructor(private activatedRoute:ActivatedRoute, 
    private authService: AuthService, private router:Router,
    ) { }
    isLoading: Subject<boolean> = this.authService.isLoading;
    isActivationToken : boolean = false;
    successMessage = '';
    token = '';
  ngOnInit(): void {
      const activationToken = this.activatedRoute.snapshot.params['activationToken'];
   
    this.authService.verifyAccount(activationToken).subscribe({
          next:( result)=>{
            if(result && result.message=="Success"){
              this.isActivationToken=true;
              this.token = activationToken;
              this.router.navigateByUrl('login');  
             
            }

          
              
          }, 
          error:(err)=>{
            console.log(err)
          },
         
          });

  }
}
