import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car-Models/Car';
import { LocalStoreService } from 'src/app/services/local-store.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() car: Car;
  showCarDetails: boolean = false;

  constructor(
    private localStore: LocalStoreService
  ) { }

  ngOnInit(): void {
  }

  showDetails() {
    this.showCarDetails = !this.showCarDetails;
    this.storeCarToViewdCars();
  }

  storeCarToViewdCars() {
    this.localStore.storeCarToViewdCars(this.car);
  }
}
