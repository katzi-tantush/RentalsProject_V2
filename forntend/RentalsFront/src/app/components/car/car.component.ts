import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car-Models/Car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() car: Car;
  showCarDetails: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showDetails() {
    this.showCarDetails = !this.showCarDetails;
  }

}
