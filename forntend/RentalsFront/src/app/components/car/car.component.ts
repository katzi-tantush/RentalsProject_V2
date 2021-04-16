import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/Car-Models/Car';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() car: Car;
  showCarDetails: boolean = false;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  showDetails() {
    this.showCarDetails = !this.showCarDetails;
  }

}
