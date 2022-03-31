import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";



export function confrimPasswordValidator(matchingControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value !== matchingControl.value) {
            console.log("Matching error");

            return { doesNotMatch: true };
        } else {
            console.log("Match");
            return null;
        }
    };
}




// export class ConfirmPasswordValidator {
// static mustMatch(controlName: string, matchingControlName: string){
//     return (formGroup: FormGroup) => {
//         const control = formGroup.controls[controlName];
//         const matchingControl = formGroup.controls[matchingControlName];
//         if (matchingControl.errors && !matchingControl.errors["confirmedValidator"]) {
//             return;
//         }
//         if (control.value !== matchingControl.value) {
//             console.log("Matching error");

//             matchingControl.setErrors({ "doesNotMatch": true });
//         } else {
//             matchingControl.setErrors(null);
//             console.log("Match");
//         }
//     }
// }
    // }