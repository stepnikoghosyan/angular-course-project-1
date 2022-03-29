import { FormGroup, ValidatorFn } from "@angular/forms";


export class ConfirmPasswordValidator {
    static mustMatch(controlName: string, matchingControlName: string){
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors["confirmedValidator"]) {
                return;
            }
            if (control.value !== matchingControl.value) {
                console.log("Matching error");

                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
                console.log("Match");
            }
        }
    }
}

