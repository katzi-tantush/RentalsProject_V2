import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IRentHistory } from 'src/app/models/Car-Models/IRentHistory';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-retun-cars',
  templateUrl: './retun-cars.component.html',
  styleUrls: ['./retun-cars.component.css']
})
export class RetunCarsComponent implements OnInit {
  rentedCars$: Observable<IRentHistory[]>;
  contractPrice: number;

  constructor(private carService: CarsService) { }

  ngOnInit(): void {
    this.rentedCars$ = this.getRentHistory();
  }

  private getRentHistory(): Observable<IRentHistory[]> {
    return this.carService.getRentHistories();
  }

  getContractPrice(rentHistory: IRentHistory) {
    this.contractPrice = this.carService.calculatePrice(rentHistory);
  }

  returnCar(rentHistory: IRentHistory) {
    this.carService.returnCar(rentHistory);
  }
}
