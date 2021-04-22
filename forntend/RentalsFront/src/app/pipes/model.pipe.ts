import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/Car-Models/Car';

@Pipe({
  name: 'model'
})
export class ModelPipe implements PipeTransform {

  transform(cars: Car[], model: string): Car[] {
    if (!cars || !model) {
      return cars;
    }

    return cars.filter(c => c.carCategory.model == model);
  }

}
