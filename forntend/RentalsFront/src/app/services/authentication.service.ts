import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthenticatedUser } from '../models/User-Models/authenticatedUser';
import { IUser } from '../models/User-Models/user';
import { IUserLoginData } from '../models/User-Models/userLoginData';
import { HttpService } from './http.service';
import { LocalStoreService } from './local-store.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ILoggedInUser } from '../models/User-Models/ILoggefInUser';

@Injectable({
  providedIn: 'root'
})
  // responsibility: login, register, store and retrieve token
  // TODO: decide if I want a local storage service
export class AuthenticationService {
  user$: BehaviorSubject<IUser> = new BehaviorSubject(null);
  loggedInUser$: BehaviorSubject<ILoggedInUser> = new BehaviorSubject(null);

  constructor(
    private httpService: HttpService,
    private localStore: LocalStoreService,
    private router: Router
  ) { }
  
  login(loginData:IUserLoginData) {
    this.httpService.post('users/login', loginData, this.httpService.getBasicHeaders())
      .pipe(map(response => response as IAuthenticatedUser))
      .subscribe(
        response => {
          this.user$.next(response.requestingUser);
          this.localStore.storeAuthenticatedUser(response);
          this.router.navigate(['home']);
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

  setLoggedInUser() {
    let storedUser: ILoggedInUser = this.localStore.getStoredUser();
    this.loggedInUser$.next(storedUser);
  }

  getLoggedInUserObs(): Observable<ILoggedInUser>{
    return this.loggedInUser$.asObservable();
  }
}
