import { Injectable } from '@angular/core';
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

  constructor() { }
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

    console.log('user: ' + JSON.stringify(this.getStoredUser()));
    console.log('token: ' + this.getAuthToken());
  }

  getStoredUser(): ILoggedInUser {
    return JSON.parse(window.localStorage.getItem(this.loggedInUserKey)) as ILoggedInUser;
  }

  // gets a vlue by key from local storage
  getAuthToken():string {
    return window.localStorage.getItem(this.tokenKey);
  }
}
