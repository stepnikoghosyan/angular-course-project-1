import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';

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
  isLoading: Subject <boolean> = this.authService.isLoading;
  
   email = new FormControl("", [Validators.email, Validators.required])
   
  ngOnInit(): void {
      const activationToken = this.activatedRoute.snapshot.params['activationToken']
        if(activationToken){
          this.authService.verifyAccount(activationToken).subscribe();
   
      }else{
        this.router.navigateByUrl('regiter')
      } 

  }
}
