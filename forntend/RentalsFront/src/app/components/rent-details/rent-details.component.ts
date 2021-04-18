import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car-Models/Car';
import { IRentHistory } from 'src/app/models/Car-Models/IRentHistory';
import { CarsService } from 'src/app/services/cars.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.css']
})
export class RentDetailsComponent implements OnInit {
  @Input() rentHistory: IRentHistory;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
