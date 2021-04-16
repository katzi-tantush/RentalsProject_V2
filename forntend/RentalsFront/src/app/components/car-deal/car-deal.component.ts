import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car-Models/Car';
import { RentData } from 'src/app/models/Car-Models/RentData';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { CarsService } from 'src/app/services/cars.service';
import { Calculator } from 'src/app/Utils/Calculator';
import { dateBeforeValidator } from 'src/app/validators/dateBeforeValidator';
import { BehaviorSubject } from 'rxjs';
import { observableDateBeforeValidator } from 'src/app/validators/observableDateBeforeValidator';

@Component({
  selector: 'app-car-deal',
  templateUrl: './car-deal.component.html',
  styleUrls: ['./car-deal.component.css']
})
export class CarDealComponent implements OnInit {
  selectedCar: Car;
  price: number;
  priceMsgVisible: boolean = false;

  private startDate$: BehaviorSubject<Date> = new BehaviorSubject(null);

  rentForm: FormGroup;
  rentData: RentData = {
    userID: null,
    carID: null,
    contractStart: null,
    contractEnd: null
  }


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  )
  { }

  ngOnInit(): void {
    this.selectedCar = this.userService.selectedCar;

    this.rentForm = this.formBuilder.group({
      contractStart: [this.rentData.contractStart,
      [Validators.required, dateBeforeValidator(new Date())]],
      contractEnd: [this.rentData.contractEnd,
      [Validators.required, observableDateBeforeValidator(this.startDate$.asObservable())]],
    });

    this.listenToStartDate();
    this.calculatePrice();
  }

  showPriceMsg() {
    this.priceMsgVisible = !this.priceMsgVisible;
    if (this.priceMsgVisible) {
      console.log('price should be visible');
    }
    else {
      console.log('price should be hidden');
    }
  }

  calculatePrice() {
    let start: Date;

    this.rentForm.get('contractStart').valueChanges.subscribe(
      startChange => {
        console.log('startChange: ' + startChange);
        start = startChange;
      }
    );

    this.rentForm.get('contractEnd').valueChanges.subscribe(
      endChange => {
        console.log('endChange: ' + endChange);
        this.price = Calculator.timeDiffInDays(start, endChange, this.selectedCar.carCategory.dailyCost);
      });
  };

  listenToStartDate() {
    this.rentForm.get('contractStart').valueChanges.subscribe(
      date => this.startDate$.next(date)
    );
  }
}
