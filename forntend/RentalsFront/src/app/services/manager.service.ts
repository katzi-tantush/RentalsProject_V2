import { Injectable } from '@angular/core';
import { Car } from '../models/Car-Models/Car';
import { CarsService } from './cars.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private carService:CarsService) { }

  deleteCar(car: Car) {
    this.carService.deleteCar(car);
  }
}
