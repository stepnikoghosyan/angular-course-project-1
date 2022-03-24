import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setImage'
})
export class SetImagePipe implements PipeTransform {

    transform(value: string | null | undefined): string{
        return  value? value: value = "../../assets/images/img.png";
        
    }
}
