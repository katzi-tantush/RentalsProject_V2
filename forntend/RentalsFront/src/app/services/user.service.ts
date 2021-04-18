import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { IRentHistory } from '../models/Car-Models/IRentHistory';
import { Car } from '../models/Car-Models/Car';
import { AuthenticationService } from './authentication.service';
import { CarsService } from './cars.service';
import { ILoggedInUser } from '../models/User-Models/ILoggefInUser';
import { RouterOutletParams } from '../Utils/RouterOutletParams';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser$: Observable<ILoggedInUser>;
  selectedCar: Car;

  constructor(
    private authService: AuthenticationService,
    private carService: CarsService
  ) {
    this.loggedInUser$ = authService.getLoggedInUserObs();
   }

  calculatePreRentCost(start: Date, end: Date): number {
    let millisecondsDiff: number = Math.abs(+start - +end);
    let daysDiff: number = Math.ceil(millisecondsDiff / (1000 * 60 * 60 * 24))

    let rentPrice: number = daysDiff * this.selectedCar.carCategory.dailyCost;

    return rentPrice;
  }

  getRentHistoryByUser(): Observable<IRentHistory[]> {
    let userId: number;
    this.authService.getLoggedInUserObs().subscribe(
      userRes => userId = userRes.id
    );

    return this.carService.getRentHistories().pipe(
      map(rentHistoryArr => rentHistoryArr.filter(r => r.rentData.userID == userId))
    );
  }

  configureRoleNavigation(userRole: string, routerOutlerParamsArr: RouterOutletParams[]) {
    routerOutlerParamsArr = [];
    switch (userRole) {
      case 'User':
        routerOutlerParamsArr.push(new RouterOutletParams('rentHistory', 'Rent History'));
        break;
      case 'Employee':
        routerOutlerParamsArr.push(new RouterOutletParams('returnCars', 'Return Cars'));
        break;
      case 'Manager':
        routerOutlerParamsArr.push(new RouterOutletParams('allRents', 'View All Rent History'));
        routerOutlerParamsArr.push(new RouterOutletParams('manageCars', 'Manage Cars'));
        routerOutlerParamsArr.push(new RouterOutletParams('manageUsers', 'Manage Users'));
        break;
    }
  }
}
