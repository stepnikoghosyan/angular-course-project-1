import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setCommentImage'
})
export class SetCommentImagePipe implements PipeTransform {

    transform(value: string | null | undefined): string{
        console.log("curr image", value);
      
        return  value? value: value = "../../assets/images/current_user_comment_image.jpg";
        
    }

}
