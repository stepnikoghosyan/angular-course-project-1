import {Pipe, PipeTransform} from '@angular/core';
import {UserModel} from "../main/models/user.model";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: UserModel | null | undefined): string | null {
    return user ? `${user.firstName} ${user.lastName}` : null;
  }

}
