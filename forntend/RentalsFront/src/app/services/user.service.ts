import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { IRentHistory } from '../models/Car-Models/IRentHistory';
import { Car } from '../models/Car-Models/Car';
import { AuthenticationService } from './authentication.service';
import { CarsService } from './cars.service';
import { ILoggedInUser } from '../models/User-Models/ILoggefInUser';
import { RouterOutletParams } from '../Utils/RouterOutletParams';
import { IUser } from '../models/User-Models/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersEndpoint: string = 'users';

  loggedInUser$: Observable<ILoggedInUser>;
  selectedCar: Car;
  private allUsers$: BehaviorSubject<IUser> = new BehaviorSubject(null);

  constructor(
    private authService: AuthenticationService,
    private carService: CarsService,
    private http: HttpService
  ) {
    this.loggedInUser$ = authService.getLoggedInUserObs();
    this.updateUsers();
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

  getRouterParams(): Observable<RouterOutletParams[]>{
    return this.loggedInUser$.pipe(
      map(userRes => {
        if (userRes) {
          return this.getRoleNavigation(userRes.role)
        }
        return [];
      })
    );
  }

  private getRoleNavigation(userRole: string): RouterOutletParams[] {
    let routerOutlerParamsArr: RouterOutletParams[] = [];
    switch (userRole) {
      case 'User':
        routerOutlerParamsArr.push(new RouterOutletParams('rentHistory', 'Rent History'));
        break;
      case 'Employee':
        routerOutlerParamsArr.push(new RouterOutletParams('returnCars', 'View And Edit Current Contracts'));
        break;
      case 'Manager':
        routerOutlerParamsArr.push(new RouterOutletParams('returnCars', 'View And Edit Current Contracts'));
        routerOutlerParamsArr.push(new RouterOutletParams('editCars', 'Edit Cars'));
        routerOutlerParamsArr.push(new RouterOutletParams('editUsers', 'Edit Users'));
        break;
    }

    return routerOutlerParamsArr;
  }

  private updateUsers() {
    this.http.get<IUser>(this.usersEndpoint, null, this.http.getAuthHeaders()).subscribe(
      ussersRes => this.allUsers$.next(ussersRes)
    )
  }

  getUsersObs(): Observable<IUser>{
    return this.allUsers$.asObservable();
  }
}
