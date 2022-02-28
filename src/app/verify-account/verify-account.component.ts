import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private authService: AuthService,private router: Router) {

  }

  ngOnInit(): void {
    const activationToken = this.activatedRoute.snapshot.params['activationToken'];
    if(activationToken) {
      this.authService.verifyAccount(activationToken).subscribe(()=>{
        this.router.navigateByUrl('/login');
      });
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

}
