import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/Car-Models/Car';
import { IRentHistory } from 'src/app/models/Car-Models/IRentHistory';
import { RentData } from 'src/app/models/Car-Models/RentData';
import { CarsService } from 'src/app/services/cars.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrls: ['./rent-history.component.css']
})
export class RentHistoryComponent implements OnInit {
  rentHistoryArr$: Observable<IRentHistory[]>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.rentHistoryArr$ = this.userService.getRentHistoryByUser();
  }

}
