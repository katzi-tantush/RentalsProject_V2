import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../models/Car-Models/Car';
import { IAuthenticatedUser } from '../models/User-Models/authenticatedUser';
import { ILoggedInUser } from '../models/User-Models/ILoggefInUser';
import { IUser } from '../models/User-Models/user';
import { UserFactory } from '../Utils/UserFactory';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  private tokenKey: string = 'token';
  private loggedInUserKey: string = 'loggedInUser';
  private storedCarsKey: string = 'storedCars';

  private storedCars$: BehaviorSubject<Car[] | null> = new BehaviorSubject(null);

  constructor() {
   }

  // sets a key value pair in local storage
  private set(itemKey:string, value: any) {
    window.localStorage.setItem(itemKey, value);
}

  // sets the users token value
  setToken(value: any) {
    this.set(this.tokenKey, value);
  }

  // sets logged in info in local storage
  setLoggedInUser(user: IUser) {
    let loggedInUser = UserFactory.userToLoggedInUser(user);
    this.set(this.loggedInUserKey, JSON.stringify(loggedInUser));
  }

  storeAuthenticatedUser(authenticatedUser: IAuthenticatedUser) {
    this.setToken(authenticatedUser.responseToken);
    this.setLoggedInUser(authenticatedUser.requestingUser);
  }

  getStoredUser(): ILoggedInUser {
    return JSON.parse(window.localStorage.getItem(this.loggedInUserKey)) as ILoggedInUser;
  }

  // gets a vlue by key from local storage
  getAuthToken():string {
    return window.localStorage.getItem(this.tokenKey);
  }

  storeCarToViewdCars(car: Car) {
    // localStorage.setItem(this.storedCarsKey, null);

    let storedCars: Car[] = this.getStoredCars();
    if (!storedCars) {
      storedCars = [car];
    }
    else {
      storedCars = <Car[]>storedCars;
      if (storedCars.filter(c => c['id'] == car.id).length > 0) {
        
        console.log('before filter' + JSON.stringify(storedCars));
        storedCars.push(car);
        console.log('after filter' + JSON.stringify(storedCars));
      }
    }
    // console.log('before local storage' + JSON.stringify(storedCars));
    
    localStorage.setItem(this.storedCarsKey, JSON.stringify(storedCars))

    // console.log('after local storage' + JSON.stringify(this.getStoredCars()));
    
  }

  private getStoredCars(){
    return JSON.parse(localStorage.getItem(this.storedCarsKey));
  }
}
