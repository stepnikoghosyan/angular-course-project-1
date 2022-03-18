import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function errors(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => null;
    // return (control: AbstractControl): {[key: string]: any} | null => 
    //    control.value.required? null: { passwordRequired: control.value } || 
    //     control.value.minLength == 6? null: {wrondPasswordLength: control.value.minLength}
}

@Directive({
  selector: '[inputErrors]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: InputErrorsDirective,
      multi: true
  }]
})
export class InputErrorsDirective implements Validator {

    constructor() { }
    
    validate(control: AbstractControl): ValidationErrors | null {
        return errors()(control);
    }

}
