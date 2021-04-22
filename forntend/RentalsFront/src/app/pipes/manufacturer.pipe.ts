import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/Car-Models/Car';

@Pipe({
  name: 'manufacturer'
})
export class ManufacturerPipe implements PipeTransform {

  transform(cars: Car[], manufacturer: string): Car[] {
    if (!cars || !manufacturer) {
      return cars;
    }

    return cars.filter(c => c.carCategory.manufacturer == manufacturer);
  }

}
