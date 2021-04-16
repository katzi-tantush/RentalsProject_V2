import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  private tokenKey: string = 'token';

  constructor() { }
  // sets a key value pair in local storage
  set(itemKey:string, value: any) {
    window.localStorage.setItem(itemKey, value);
  }
  // sets the users token value
  setToken(value: any) {
    this.set(this.tokenKey, value);
  }

  // gets a vlue by key from local storage
  getAuthToken():string {
    return window.localStorage.getItem(this.tokenKey);
  }
}
