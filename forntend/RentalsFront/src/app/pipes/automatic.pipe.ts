import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/Car-Models/Car';

@Pipe({
  name: 'automatic'
})
export class AutomaticPipe implements PipeTransform {

  transform(cars: Car[], automatic:boolean = null): Car[] {
    if (!cars || automatic == null) {
      return cars;
    }
    
    return cars.filter(c=> c.carCategory.automatic == automatic);
  }

}
