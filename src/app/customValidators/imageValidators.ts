
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function imageTypeValidation(arr:string[]):ValidatorFn{
    return function (control:AbstractControl): ValidationErrors | null {
        const file = control.value;     
        let isImageType:boolean = false;
        if(file){  
            const path:string[] = file.split("\\");
            const imageType:string[]= path[path.length-1].split(".");
            let item = imageType[1].toLowerCase()
            for(let i = 0; i <arr.length; i++){
                if(arr[i]===item){
                    isImageType = true;      
                   
                }
            }
            if(isImageType){
                return null;
            }else{
                return {type:true};
            }
   
            
        }  
       
      return null;     
    }
}
export function imageSizeValidation(file:File):ValidatorFn{
    return function (control:AbstractControl):ValidationErrors | null {
        const fileSize = file.size;
       
        if(fileSize>2097152){
           
            return {size:true};
        }
       
        return null
       
    }
}