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
    // this.set(this.storedCarsKey, null);
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

  // set a local storage item for logged in user
  storeAuthenticatedUser(authenticatedUser: IAuthenticatedUser) {
    this.setToken(authenticatedUser.responseToken);
    this.setLoggedInUser(authenticatedUser.requestingUser);
  }

  // gets the stored user from local storage
  getStoredUser(): ILoggedInUser {
    return JSON.parse(window.localStorage.getItem(this.loggedInUserKey)) as ILoggedInUser;
  }

  // gets a vlue by key from local storage
  getAuthToken():string {
    return window.localStorage.getItem(this.tokenKey);
  }

  // if the viewed car is not already in local storage: adds it
  storeCarToViewdCars(car: Car) {
    let storedCars: Car[] = this.getStoredCars();
    if (!storedCars) {
      storedCars = [car];
    }
    else {
      storedCars = <Car[]>storedCars;
      let carInStorage: boolean = false;

      storedCars.forEach(storedCar => {
        if (storedCar['id'] == car.id) {
          carInStorage = true;
        }
      })
      carInStorage ? null : storedCars.push(car);

    }
    this.set(this.storedCarsKey, JSON.stringify(storedCars))
    console.log(this.getStoredCars());
  }

  // retrieves viewed cars from local storage
  private getStoredCars(){
    return JSON.parse(localStorage.getItem(this.storedCarsKey));
  }

}
