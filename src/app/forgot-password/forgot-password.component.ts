import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private authService:AuthService) { }
   email = new FormControl("", [Validators.email, Validators.required])
  isLoading:Subject<boolean> = this.authService.isLoading
  ngOnInit(): void {
  }

}
