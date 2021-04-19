import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, pipe, zip } from 'rxjs';
import { finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ISkeletonCar } from '../models/Car-Models/ISkeletonCar';
import { Branch } from '../models/Car-Models/Branch';
import { Car } from '../models/Car-Models/Car';
import { CarCategory } from '../models/Car-Models/CarCategory';
import { RentData } from '../models/Car-Models/RentData';
import { CarFactory } from '../Utils/CarFactory';
import { HttpService } from './http.service';
import { AuthenticationService } from './authentication.service';
import { IRentHistory } from '../models/Car-Models/IRentHistory';
import { Calculator } from '../Utils/Calculator';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsEndpoint: string = 'cars';
  private branchEndpoint: string = 'branches';
  private categoryEndpoint: string = 'carCategories';
  private rentedCarsEndpoint: string = 'rentedCars';

  private cars$: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private rentHistories$: BehaviorSubject<IRentHistory[]> = new BehaviorSubject([]);
  private returnDate$: BehaviorSubject<Date> = new BehaviorSubject(null);

  constructor(
    private http: HttpService,
    private authService: AuthenticationService,
  )
  {
    this.updateCarsState();
    this.updateRentHistories();
  }
    
  // get and state ------------------------

  private updateCarsState() {
    this.buildCars().subscribe(cars => this.cars$.next(cars));
  }

  private buildCars(): Observable<Car[]> {
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
      );
  }

  private updateRentHistories() {
    let carsObs$: Observable<Car[]> = this.buildCars();
    let rentDataObs$: Observable<RentData[]> = this.http.get<RentData[]>(this.rentedCarsEndpoint);

    forkJoin([carsObs$, rentDataObs$]).pipe(
      map(([cars, rentDataArr]) =>
      {
        console.log(rentDataArr);
        if (rentDataArr != []) {
          return CarFactory.builRentHistoryArr(cars, rentDataArr);
        }
      }
      ))
      .subscribe(rentHistories => this.rentHistories$.next(rentHistories));
  }

  getRentHistories(): Observable<IRentHistory[]> {
    return this.rentHistories$.asObservable();
  }

  getCarsObs(): Observable<Car[]> {
    return this.cars$.asObservable()
  }

  // ---------------------------------------

  // RentHistories --------------------------

  private postRentHistory(rentData: RentData) {
    rentData.userID = this.authService.user$.getValue().id;
    rentData.id = 0;

    this.http.post(this.rentedCarsEndpoint, rentData, this.http.getBasicHeaders()).subscribe(
      rentDataRes => console.log(`Rent Data has been succesfully stored: ${JSON.stringify(rentDataRes)}`)
    );
  }

  
  // ------------------------------------------
  
  // rent functionality -----------------------
  
  rent(rentData: RentData) {
    if (!this.authService.user$.getValue()) {
      alert('You must be logged in as a registered user to rent cars')
    }
    
    let car: Car = this.cars$.getValue().filter(c => c.id == rentData.carID)[0];
    
    if (!car.availableForRent) {
      alert('This car is not available for rent, please choose another')
    }
    else {
      let skelitizedCar: ISkeletonCar = CarFactory.carToSkeleton(car);
      skelitizedCar.availableForRent = false;
      
      this.http.put(this.carsEndpoint, skelitizedCar, this.http.getBasicHeaders()).subscribe(
        carRes => console.log(carRes)
        );
        this.updateCarsState();
        
        this.postRentHistory(rentData);
      }
    }
    

  // -------------------------------------------

  // return cars functionality -----------------

  returnCar(rentHistory: IRentHistory) {
    this.putUpdatedReturnDateRentData(rentHistory.rentData);
    this.putAvailableForRentCar(rentHistory.car);

    this.updateCarsState();
    this.updateRentHistories();
  }

  private putAvailableForRentCar(car: Car) {
    let skeliCar: ISkeletonCar = CarFactory.carToSkeleton(car);
    skeliCar.availableForRent = true;

    this.http.put<ISkeletonCar>(this.carsEndpoint, skeliCar, this.http.getAuthHeaders()).subscribe(
      res => console.log('updated car: ' + res)
      
    )
  }

  private putUpdatedReturnDateRentData(rentData: RentData) {
    rentData.carReturnDate = this.getReturnDate();
    console.log('current rent data state: ' + rentData);
    

    this.http.put(this.rentedCarsEndpoint, rentData, this.http.getAuthHeaders()).subscribe(
      res => console.log('changed rent data: ' + res)
    );
  }

  calculatePrice(rentHistory: IRentHistory): number {
    return Calculator.postReturnCost(rentHistory.rentData, this.getReturnDate(),  rentHistory.car.carCategory);
  }


  setReturnDate(date: Date) {
    this.returnDate$.next(date);
  }

  getReturnDate():Date {
    return this.returnDate$.getValue();
  }

  // --------------------------------------------

  deleteCar(car: Car) {
    this.http.delete(this.carsEndpoint, car.id).subscribe(
      res => alert('the following car was removed from the database: ' + res)
    );
  }
}
