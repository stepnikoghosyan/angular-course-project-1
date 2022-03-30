import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setUserImage'
})
export class SetUserImagePipe implements PipeTransform {

  transform(value: string): string {
      console.log("user pipe works");
      
    return  value? value: value = "../../assets/images/user_image.jpg";
  }

}
