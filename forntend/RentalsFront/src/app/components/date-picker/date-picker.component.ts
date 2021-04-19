import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  constructor(private carService:CarsService) { }

  ngOnInit(): void {
  }

  setReturnDate(inputDate:Date) {
    this.carService.setReturnDate(inputDate);
  }
}
