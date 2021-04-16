import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, zip } from 'rxjs';
import { finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ISkeletonCar } from '../Interfaces/ISkeletonCar';
import { Branch } from '../models/Car-Models/Branch';
import { Car } from '../models/Car-Models/Car';
import { CarCategory } from '../models/Car-Models/CarCategory';
import { RentData } from '../models/Car-Models/RentData';
import { CarFactory } from '../Utils/CarFactory';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsEndpoint: string = 'cars';
  private branchEndpoint: string = 'branches';
  private categoryEndpoint: string = 'carCategories';
  private rentedCarsEndpoint: string = 'rentedCars';

  private cars$: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private rentHistory$: BehaviorSubject<RentData[]> = new BehaviorSubject([]);

  
  constructor(
    private http: HttpService
  )
  {
    this.updateCarsState();
      
    this.getRentData();
  }
    

  private updateCarsState() {
    let skeletonCars$: Observable<ISkeletonCar[]> = this.http.get<ISkeletonCar[]>(this.carsEndpoint);
    let categories$: Observable<CarCategory[]> = this.http.get<CarCategory[]>(this.categoryEndpoint);
    let branches$: Observable<Branch[]> = this.http.get<Branch[]>(this.branchEndpoint);
  
    return forkJoin([skeletonCars$, categories$, branches$])
      .pipe(
        map(([skelicars, categories, branches]) => skelicars.map(skelicar => {
          let category = categories.filter(c => c.id == skelicar.carCategoryID)[0];
          let branch = branches.filter(b => b.id == skelicar.branchID)[0];
          let car: Car = CarFactory.BuildCar(skelicar, branch, category);
          return car;
        }))
      )
      .subscribe(cars => this.cars$.next(cars));
  }

  private getRentData() {
    this.http.get<RentData[]>(this.rentedCarsEndpoint).subscribe(
      rentRes => this.rentHistory$.next(rentRes)
    );
  }
  
  getCarsObs(): Observable<Car[]> {
    return this.cars$.asObservable()
  }

  getRentHistoryObs(): Observable<RentData[]>{
    return this.rentHistory$.asObservable();
  }

  private postRentHistory(rentData:RentData) {
    this.http.post(this.rentedCarsEndpoint, rentData, this.http.getBasicHeaders()).subscribe(
      rentDataRes => console.log(`Rent Data ${rentData} has been succesfully stored`)
    );
  }

  rent(rentData: RentData) {
    let car: Car = this.cars$.getValue().filter(c => c.id == rentData.carID)[0];

    if (!car.availableForRent) {
      alert('This car is not available for rent, please choose another')
    }
    else {
      car.availableForRent = false;
      this.http.put(this.carsEndpoint, car, this.http.getBasicHeaders()).subscribe(
        carRes => console.log(carRes)
      );
      this.updateCarsState();

      this.postRentHistory(rentData);
      this.getRentData();
    }
  }
}
