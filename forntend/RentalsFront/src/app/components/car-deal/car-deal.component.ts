import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car-Models/Car';
import { RentData } from 'src/app/models/Car-Models/RentData';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { dateValidator } from 'src/app/validators/dateValidator';
import { Parser } from 'src/app/Utils/Parser';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-deal',
  templateUrl: './car-deal.component.html',
  styleUrls: ['./car-deal.component.css']
})
export class CarDealComponent implements OnInit {
  selectedCar: Car;
  priceHidden: boolean = true;
  price: number | string;
  private startDate: Date;
  private endDate: Date;


  rentForm: FormGroup;
  rentData: RentData = {
    userID: null,
    carID: null,
    contractStart: null,
    contractEnd: null
  }

  constructor(
    private userService: UserService,
    private carService: CarsService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  )
  { }

  ngOnInit(): void {
    this.selectedCar = this.userService.selectedCar;

    this.rentForm = this.formBuilder.group({
      contractStart: [this.rentData.contractStart,
        [Validators.required, dateValidator()]],
      contractEnd: [this.rentData.contractEnd,
        [Validators.required, dateValidator()]],

    })
  }

  showPrice() {
    this.rentData = this.rentForm.value;
    this.rentData.contractStart = Parser.shortDateToString(this.rentData.contractStart);
    this.rentData.contractEnd = (Parser.shortDateToString(this.rentData.contractEnd));
    
    this.parseStringDates(this.rentData.contractStart, this.rentData.contractEnd);

    if (!this.validateDates()) {
      alert('Start Date must be later than today and End date must be later than Start Date')
    }
    else {
      this.price = this.calculatePreRentCost(this.startDate, this.endDate);
      this.priceHidden = !this.priceHidden;
    }
  }

  validateDates(): boolean {
    let now: Date = new Date

    let validDates: boolean = (this.startDate < this.endDate) && (this.startDate >= now);

    return validDates;
  }

  calculatePreRentCost(start: Date, end: Date):number | string {
    return this.userService.calculatePreRentCost(start, end);
  }

  parseStringDates(start:string, end:string) {
    this.startDate = Parser.shortDateStringToDate(start);
    this.endDate = Parser.shortDateStringToDate(end);
  }

  rent() {
    if (!this.authService.user$.getValue()) {
      alert('you must be logged in as a registered user to rent!')
    }
    else {
      this.rentData.carID = this.selectedCar.id;
      this.rentData.userID = this.authService.user$.getValue().id;
      
      this.carService.rent(this.rentData);
    }
  }
}
