import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/Car-Models/Car';

@Pipe({
  name: 'freeTextFilter'
})
export class FreeTextFilter implements PipeTransform {

  transform(cars: Car[], searchValue: string): Car[] {
    if (!cars || !searchValue) {
      return cars;
    }
    searchValue = searchValue.toLowerCase()

    return cars
      .filter(c =>
        c.carCategory.manufacturer.toLowerCase().indexOf(searchValue) > -1
        ||
        c.carCategory.model.toLowerCase().indexOf(searchValue) > -1
        ||
        c.branch.address.toLowerCase().lastIndexOf(searchValue) > -1
      );
  }

}
