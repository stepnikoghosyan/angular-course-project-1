import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function emailValidator(): ValidatorFn {
  const emailRegExp  = new RegExp(`^[A-Za-z0-9-_.]+[A-Za-z0-9]+@(([A-Za-z0-9-])+([A-Za-z0-9]+)\\.)+[A-Za-z0-9]{2,4}$`);
  return (control: AbstractControl): ValidationErrors | null => {
    return emailRegExp.test(control.value) ? null : {email: control.value};
  };
}


