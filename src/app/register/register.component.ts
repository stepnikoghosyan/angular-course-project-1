import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    isSuccess = false;
    message!:string
    errors: string[] = [];
    registerForm: FormGroup = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required], 
        email: ['', ],
//Validators.required, Validators.email,
// Validators.required,Validators.minLength(6)
        password: ['',]
                       
                
    });

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

    ngOnInit(): void {}

    registerFormSubmit(){
        console.log("SUBMIT FORM", this.registerForm.value);
        const dto = new RegisterDto(this.registerForm.value);
        if(this.registerForm){
            this.authService.register(dto).subscribe({
                next: (data)=> {
                    
                    this.isSuccess = true;
                    this.message = "Success!";
                    console.log("DATA", data);
                    this.registerForm.reset();
                    setTimeout(()=>  this.isSuccess = false, 3000);
                },
                error: (err: HttpErrorResponse) => {
                    this.errors = [];
                    switch(err.status){
                        case 400:
                            this.errors.push("Invalid request");
                            break;
                        case 409:
                            this.errors.push("The email address is already used");
                            break;
                        default: 
                            this.errors.push('Something went wrong');
                    }
                } 
            })
        }
    }

}
