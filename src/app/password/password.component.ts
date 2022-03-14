import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: PasswordComponent,
        multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
   
    value = '';
    isDisabled = false;
    showEyeIcon = true;
    onChange!:(value: string) => void;
    onBlur!:() => void;
    
    constructor() { }

    ngOnInit(): void {

    }
    registerOnValidatorChange(fn: any): void{
        this.onChange = fn;
        console.log("FN", );
        
    }

    onChangeHandler(e:any){
        this.onChange(e.target.event);
    };
    handleBlur(){
        this.onBlur();
    }
    
    writeValue(value: string): void {
        this.value = value;
    }
    
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    
    registerOnTouched(fn: any): void {
        this.onBlur = fn;
    }

    toggleShowPassoword(){
        this.showEyeIcon = !this.showEyeIcon;
    };

}
