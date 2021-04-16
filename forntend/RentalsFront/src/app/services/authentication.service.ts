import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, Observable } from 'rxjs';
import { IAuthenticatedUser } from '../models/authenticatedUser';
import { IUser } from '../models/user';
import { IUserLoginData } from '../models/userLoginData';
import { HttpService } from './http.service';
import { LocalStoreService } from './local-store.service';
import { concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
  // responsibility: login, register, store and retrieve token
  // TODO: decide if I want a local storage service
export class AuthenticationService {
  user$: BehaviorSubject<IUser> = new BehaviorSubject(null);

  constructor(
    private httpService: HttpService,
    private localStore:LocalStoreService) { }
  
  login(loginData:IUserLoginData) {
    this.httpService.post('users/login', loginData, this.httpService.getBasicHeaders())
      .pipe(map(response => response as IAuthenticatedUser))
      .subscribe(
        response => {
          this.user$.next(response.requestingUser);
          this.localStore.setToken(response.responseToken);
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  register(newUser:IUser) {
    this.httpService.post('users', newUser, this.httpService.getBasicHeaders()).subscribe(
      newUser => {
        if (newUser) {
          this.login({ userName: newUser['userName'], password: newUser['password'] });
        }
      },
      error => console.log(error)
    )
  }
}
