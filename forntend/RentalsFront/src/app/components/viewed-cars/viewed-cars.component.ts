import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/Car-Models/Car';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-viewed-cars',
  templateUrl: './viewed-cars.component.html',
  styleUrls: ['./viewed-cars.component.css']
})
export class ViewedCarsComponent implements OnInit {
  viewedCars$: Observable<Car[]>;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.viewedCars$ = this.userService.getViewedCarsObs();
  }
}
