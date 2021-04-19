import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/User-Models/user';
import { Sorter } from '../Utils/Sorter';

@Pipe({
  name: 'roleFilter'
})
export class RoleFilterPipe implements PipeTransform {

  transform(users: IUser[]): IUser[] {
    if (!users) {
      return null
    }

    return users.sort(Sorter.compareRole);
  }

}
