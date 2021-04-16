import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRentHistory } from '../Interfaces/IRentHistory';
import { Car } from '../models/Car-Models/Car';
import { RentData } from '../models/Car-Models/RentData';
import { Parser } from '../Utils/Parser';
import { AuthenticationService } from './authentication.service';
import { CarsService } from './cars.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedCar: Car;

  constructor(
    private authService: AuthenticationService,
    private carService: CarsService
  ) { }

  calculatePreRentCost(start: Date, end: Date): number {
    let millisecondsDiff: number = Math.abs(+start - +end);
    let daysDiff: number = Math.ceil(millisecondsDiff / (1000 * 60 * 60 * 24))

    let rentPrice: number = daysDiff * this.selectedCar.carCategory.dailyCost;

    return rentPrice;
  }

  // getUserRentData(userId: number) {
  //   forkJoin([this.carService.getCarsObs(), this.carService.getRentHistoryObs()])
  //     .pipe(
  //       map(obj => {
  //         let cars: Car[] = obj[0];
  //         let history: RentData[] = obj[1].filter(rentData => rentData.userID == userId);

  //         let userHistory: IRentHistory[] = [];
  //         history.forEach(rentData => {
  //           userHistory.push({
  //             car: cars.filter(c=> c.id == rentData.carID)
  //           })
  //         });
  //       })
  //     )
  // }
}
