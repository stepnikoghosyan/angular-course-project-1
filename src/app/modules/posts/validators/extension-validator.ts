import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export const extensions = ['jpg', 'jpeg', 'png'];
export function extensionsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value) {
            let fileExtension = value.type.split('/').pop()?.toLowerCase();
            return extensions.indexOf(fileExtension) > -1 ? null : { valid: false }
        } else {
            return null
        }
    };
}