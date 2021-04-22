import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRentHistory } from '../models/Car-Models/IRentHistory';
import { Car } from '../models/Car-Models/Car';
import { AuthenticationService } from './authentication.service';
import { CarsService } from './cars.service';
import { ILoggedInUser } from '../models/User-Models/ILoggefInUser';
import { RouterOutletParams } from '../Utils/RouterOutletParams';
import { IUser } from '../models/User-Models/user';
import { HttpService } from './http.service';
import { roles } from '../constants/roles';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersEndpoint: string = 'users';
  private viewedCars$: Observable<Car[]>;
  userRoles: string[] = roles;

  private allUsers$: BehaviorSubject<IUser> = new BehaviorSubject(null);
  loggedInUser$: Observable<ILoggedInUser>;
  selectedCar: Car;

  constructor(
    private authService: AuthenticationService,
    private carService: CarsService,
    private localStore: LocalStoreService,
    private http: HttpService
  ) {
    this.loggedInUser$ = authService.getLoggedInUserObs();
    this.updateUsersState();
    this.viewedCars$ = this.localStore.getStoredCarsObs();
  }

  // returns the price for renting a car between the input dates
  calculatePreRentCost(start: Date, end: Date): number {
    let millisecondsDiff: number = Math.abs(+start - +end);
    let daysDiff: number = Math.ceil(millisecondsDiff / (1000 * 60 * 60 * 24))

    let rentPrice: number = daysDiff * this.selectedCar.carCategory.dailyCost;

    return rentPrice;
  }

  // TODO: test this
  getRentHistoryByUser(): Observable<IRentHistory[]> {
    let userId: number;
    this.authService.getLoggedInUserObs().subscribe(
      userRes => userId = userRes.id
    );

    return this.carService.getRentHistories().pipe(
      map(rentHistoryArr => rentHistoryArr.filter(r => r.rentData.userID == userId))
    );
  }

  // retrun an observable of the user route params according to user role
  getRouterParams(): Observable<RouterOutletParams[]> {
    return this.loggedInUser$.pipe(
      map(userRes => {
        if (userRes) {
          return this.getRoleNavigation(userRes.role)
        }
        return [];
      })
    );
  }

  // retrun an array of the user route params according to user role
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
        routerOutlerParamsArr.push(new RouterOutletParams('editCategories', 'Edit Car Categories'));
        break;
    }

    return routerOutlerParamsArr;
  }

  // updates the current user state
  private updateUsersState() {
    this.http.get<IUser>(this.usersEndpoint, null, this.http.getAuthHeaders()).subscribe(
      ussersRes => this.allUsers$.next(ussersRes)
    )
  }

  // returns an observable of the current user
  getUsersObs(): Observable<IUser> {
    return this.allUsers$.asObservable();
  }

  // modifies an existing user in the database
  putUser(modifiedUser: IUser) {
    this.http.put(this.usersEndpoint, modifiedUser)
      .subscribe(userRes => console.log(userRes));

    this.updateUsersState();
  }

  // deletes an existing user in the database
  deleteUser(user: IUser) {
    this.http.delete(this.usersEndpoint, user.id).subscribe(
      userRes => console.log(userRes)
    );
    this.updateUsersState();
  }

  getViewedCarsObs(): Observable<Car[]>{
    return this.viewedCars$;
  }
}
