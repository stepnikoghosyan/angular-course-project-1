import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from "../main/models/user.model";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: UserModel | null | undefined, isMyEntity?: boolean): string | null {
    if (isMyEntity) {
      return `@Me`
    }
    return user ? `${user.firstName} ${user.lastName}` : null;
  }

}
