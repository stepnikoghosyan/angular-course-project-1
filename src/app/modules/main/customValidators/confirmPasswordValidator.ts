import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ConfirmPasswordValidator {
    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors["doesNotMatch"]) {
                return;
            }
            if (control.value !== matchingControl.value) {
                console.log("Matching error");
                matchingControl.setErrors({ doesNotMatch: true });
                return { doesNotMatch: true };
            } else {
                console.log("Match");
                return null
            }
        }
    }
}