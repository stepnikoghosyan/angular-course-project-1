import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR} from '@angular/forms';

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
   
    value = ''
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
        console.log("ONCHANGEHANDLER", this.value);

    };
    
    handleBlur(){
        this.onBlur();
        console.log("HANDLEBLUR", this.value);
    }
    
    writeValue(value: string): void {
        //value = "111111"
        this.value = value;
        console.log("VALUE", value, this.value);
        
    }
    
    registerOnChange(fn: any): void {
        this.onChange = fn;
    
    }
    
    registerOnTouched(fn: any): void {
        this.onBlur = fn;
    }

    // setDisabledState(isDisabled: boolean) {
    //     this.isDisabled = isDisabled;
    //   }

    toggleShowPassoword(){
        this.showEyeIcon = !this.showEyeIcon;
    };

}
