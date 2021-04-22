import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/Car-Models/Car';
import { CarCategory } from 'src/app/models/Car-Models/CarCategory';
import { CarsService } from 'src/app/services/cars.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars$: Observable<Car[]>;
  categories$: Observable<CarCategory[]>;

  // filter options:
  automatic: boolean | null;
  before: boolean | null;
  productionDate: Date | null;
  searchValue: string | null;
  manufacturer: string | null;
  model: string | null;

  constructor(
    private carsService: CarsService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cars$ = this.carsService.getCarsObs();
    this.categories$ = this.carsService.getCategoriesObs();
  }

  goToRent(car) {
    this.userService.selectedCar = car;
    this.router.navigate(['carDeal']);
  }

}
