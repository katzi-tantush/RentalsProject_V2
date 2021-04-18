import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockCarReturnDate$: BehaviorSubject<Date> = new BehaviorSubject(null);

  constructor() { }

  setMockDate(date: Date) {
    this.mockCarReturnDate$.next(date);
  }

  getMockDate():Date {
    return this.mockCarReturnDate$.getValue();
  }
}
