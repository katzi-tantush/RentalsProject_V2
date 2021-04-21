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
  private categories$: BehaviorSubject<CarCategory[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpService,
    private authService: AuthenticationService,
  ) {
    this.updateState();
  }

  // state --------------------------------------
  updateState() {
    this.updateCategories();
    this.updateCarsState();
    this.updateRentHistories();
  }

  updateCategories() {
    this.http.get<CarCategory[]>(this.categoryEndpoint, null, this.http.getBasicHeaders())
      .subscribe(categoryRes => this.categories$.next(categoryRes));
  }

  // rent car functionality ---------------------
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

      this.http.put(this.carsEndpoint, skelitizedCar).subscribe(
        carRes => console.log(carRes)
      );
      this.updateCarsState();

      this.postRentData(rentData);
    }
  }

  setReturnDate(date: Date) {
    this.returnDate$.next(date);
  }

  getReturnDate(): Date {
    return this.returnDate$.getValue();
  }

  // rent data ----------------------------------
  private postRentData(rentData: RentData) {
    rentData.userID = this.authService.user$.getValue().id;
    rentData.id = 0;

    this.http.post(this.rentedCarsEndpoint, rentData, this.http.getBasicHeaders()).subscribe(
      rentDataRes => console.log(`Rent Data has been succesfully stored: ${JSON.stringify(rentDataRes)}`)
    );

    this.updateState();
  }

  private putUpdatedReturnDateRentData(rentData: RentData) {
    rentData.carReturnDate = this.getReturnDate();

    this.http.put(this.rentedCarsEndpoint, rentData).subscribe(
      res => console.log('changed rent data: ' + res)
    );

    this.updateState();
  }

  calculatePrice(rentHistory: IRentHistory): number {
    return Calculator.postReturnCost(rentHistory.rentData, this.getReturnDate(), rentHistory.car.carCategory);
  }

  // cars ---------------------------------------
  private updateCarsState() {
    this.buildCars().subscribe(cars => this.cars$.next(cars));
  }

  private buildCars(): Observable<Car[]> {
    let skeletonCars$: Observable<ISkeletonCar[]> = this.http.get<ISkeletonCar[]>(this.carsEndpoint);
    let categories$: Observable<CarCategory[]> = this.getCategoriesObs();
    let branches$: Observable<Branch[]> = this.getBranchesObs();

    return forkJoin([skeletonCars$, categories$, branches$])
      .pipe(
        map(([skelicars, categories, branches]) =>
          skelicars.map(skelicar => {
            let category = categories.filter(c => c.id == skelicar.carCategoryID)[0];
            let branch = branches.filter(b => b.id == skelicar.branchID)[0];
            let car: Car = CarFactory.BuildCar(skelicar, branch, category);
            return car;
          }))
      );
  }

  private putAvailableForRentCar(car: Car) {
    let skeliCar: ISkeletonCar = CarFactory.carToSkeleton(car);
    skeliCar.availableForRent = true;

    this.http.put<ISkeletonCar>(this.carsEndpoint, skeliCar).subscribe(
      res => console.log('updated car: ' + res)
    );
  }

  getCarsObs(): Observable<Car[]> {
    return this.cars$.asObservable()
  }

  returnCar(rentHistory: IRentHistory) {
    this.putUpdatedReturnDateRentData(rentHistory.rentData);
    this.putAvailableForRentCar(rentHistory.car);

    this.updateCarsState();
    this.updateRentHistories();
  }

  postCar(car: Car) {
    let skeliCar: ISkeletonCar = CarFactory.carToSkeleton(car);

    this.http.post(this.carsEndpoint, skeliCar, this.http.getAuthHeaders())
      .subscribe(carRes => console.log(carRes));
  }

  deleteCar(car: Car) {
    this.http.delete(this.carsEndpoint, car.id).subscribe(
      res => alert('the following car was removed from the database: ' + res)
    );
  }

  // categories ---------------------------------
  postcategory(category: CarCategory) {
    this.http.post(this.categoryEndpoint, category, this.http.getAuthHeaders())
      .subscribe(categoryRes => console.log(categoryRes));
  }

  putCategory(category: CarCategory) {
    this.http.put(this.categoryEndpoint, category)
      .subscribe(categoryRes => console.log(categoryRes));
  }

  deleteCategory(category: CarCategory) {
    this.http.delete(this.categoryEndpoint, category.id).subscribe(
      categoryRes => console.log('This category has been removed from the database: ' + categoryRes)
    );
  }

  getCategoriesObs(): Observable<CarCategory[]> {
    return this.http.get<CarCategory[]>(this.categoryEndpoint, null, this.http.getBasicHeaders());
  }

  // branches -----------------------------------
  getBranchesObs(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.branchEndpoint, null, this.http.getBasicHeaders());
  }

  // rent histories -----------------------------
  private updateRentHistories() {
    let carsObs$: Observable<Car[]> = this.buildCars();
    let rentDataObs$: Observable<RentData[]> = this.http.get<RentData[]>(this.rentedCarsEndpoint);

    forkJoin([carsObs$, rentDataObs$]).pipe(
      map(([cars, rentDataArr]) => {
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
}
