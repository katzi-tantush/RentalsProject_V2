import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/Car-Models/Car';
import { CarsService } from 'src/app/services/cars.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-edit-cars',
  templateUrl: './edit-cars.component.html',
  styleUrls: ['./edit-cars.component.css']
})
export class EditCarsComponent implements OnInit {
  cars$: Observable<Car[]>;

  constructor(
    private managerService: ManagerService,
    private carService: CarsService
  ) { }

  ngOnInit(): void {
    this.cars$ = this.carService.getCarsObs();
  }

  deleteCar(car: Car) {
    let aproveDelete: boolean = confirm(`You're about to delete this ${car.carCategory.manufacturer} ${car.carCategory.model}/n
    are you sure?`);
    if (aproveDelete) {
      this.managerService.deleteCar(car);
    }
  }
}
