import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profilePic'
})
export class ProfilePicPipe implements PipeTransform {
  private defaultImageUrl = 'assets/images/profile_picture.jpg';

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? value : this.defaultImageUrl;
  }

}
