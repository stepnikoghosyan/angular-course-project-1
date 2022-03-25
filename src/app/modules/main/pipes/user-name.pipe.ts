import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../../../models/user.model';

@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {

  transform(user?: UserModel): string {
    return   user?.firstName + " " + user?.lastName
  }
}
