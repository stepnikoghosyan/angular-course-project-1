import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function imgTypeValidation(imgTypes: string[]): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
        const file = control.value;
        if (file) {
            const path: string[] = file.split("\\");
            const imageType: string[] = path[path.length - 1].split(".");
            let item = imageType[1].toLowerCase();
            if(imgTypes.includes(item)){
                return null
            }else{
                control.setErrors({ type: false });
                return { type: false };

            }
        }
        return null;
    }
}
export function imageSizeValidation(): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
        const fileSize = control.value.size;

        if (fileSize > 2097152) {
            return { size: true };
        }
        return null;
    }
}


// export function imageTypeValidation(arr: string[]): ValidatorFn {
//     return function (control: AbstractControl): ValidationErrors | null {
//         const file = control.value;
//         let isImageType: boolean = false;
//         if (file) {
//             const path: string[] = file.split("\\");
//             const imageType: string[] = path[path.length - 1].split(".");
//             let item = imageType[1].toLowerCase();
//             for (let i = 0; i < arr.length; i++) {
//                 if (arr[i] === item) {
//                     isImageType = true;
//                 }
//             }
//             if (isImageType) {
//                 return null;
//             } else {
//                 return { type: true };
//             }
//         }

//         return null;
//     }
// }
