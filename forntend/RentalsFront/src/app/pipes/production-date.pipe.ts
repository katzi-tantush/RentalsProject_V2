import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/Car-Models/Car';

@Pipe({
  name: 'productionDate'
})
export class ProductionDatePipe implements PipeTransform {

  // if before == true, return cars produced before prodationDate, if false, return after
  transform(cars: Car[], productionDate: Date, before: boolean | null): Car[] {
    if (!cars || !productionDate || before == null) {
      return cars;
    }
    if (before) {
      return cars.filter(c => c.carCategory.productionDate < productionDate);
    }
    
    return cars.filter(c => c.carCategory.productionDate > productionDate);
  }
}
