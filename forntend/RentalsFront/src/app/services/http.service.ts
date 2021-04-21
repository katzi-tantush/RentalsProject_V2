import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
  // responsibility: preform crud
export class HttpService {
  private baseUrl: string = 'http://localhost:56375';
  private 

  constructor(
    private http: HttpClient,
    private localStore: LocalStoreService  
  ) { }
  
  // Rest Verbs ---------------------------------------
  get<T>(endpoint:string, id?:number, httpHeaders?: HttpHeaders):Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id ? id : ''}`, {headers: httpHeaders});
  }

  post(endpoint: string, body: any, httpHeaders?: HttpHeaders): Observable<any>{
    return this.http.post(`${this.baseUrl}/${endpoint}`, JSON.stringify(body), {headers:httpHeaders});
  }

  put<T>(endpoint: string, body: T): Observable<T>{
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, JSON.stringify(body), {headers: this.getAuthHeaders()});
  }

  delete(endpoint:string, modelId:number):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${modelId}`, {headers: this.getAuthHeaders()});
  }

  // Headers setters ---------------------------------------
  getBasicHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  }

  getAuthHeaders(): HttpHeaders {
    let authToken: string = this.localStore.getAuthToken();

    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);
  }
}
