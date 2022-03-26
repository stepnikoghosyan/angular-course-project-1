import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function imgTypeValidation(arr: string[]): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
        const file = control.value;
        if (file) {
            const path: string[] = file.split("\\");
            const imageType: string[] = path[path.length - 1].split(".");
            let item = imageType[1].toLowerCase();
            if(arr.includes(item)){
                return null
            }else{
                return {type: false}
            }
        }
        return null;
    }
}
export function imageSizeValidation(file: File): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
        const fileSize = file.size;

        if (fileSize > 2097152) {
            return { size: true };
        }
        return null;
    }
}