import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car-Models/Car';
import { RentData } from 'src/app/models/Car-Models/RentData';
import { UserService } from 'src/app/services/user.service';
import { Calculator } from 'src/app/Utils/Calculator';
import { dateBeforeValidator } from 'src/app/validators/dateBeforeValidator';
import { BehaviorSubject } from 'rxjs';
import { observableDateBeforeValidator } from 'src/app/validators/observableDateBeforeValidator';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-deal',
  templateUrl: './car-deal.component.html',
  styleUrls: ['./car-deal.component.css']
})
export class CarDealComponent implements OnInit {
  selectedCar: Car;
  price: number | null;
  priceMsgVisible: boolean = false;

  private formStartDate$: BehaviorSubject<Date> = new BehaviorSubject(null);

  rentForm: FormGroup;
  rentData: RentData = {
    userID: null,
    carID: null,
    contractStartDate: null,
    contractEndDate: null
  }


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private carService:CarsService
  )
  { }

  ngOnInit(): void {
    this.selectedCar = this.userService.selectedCar;

    this.rentForm = this.formBuilder.group({
      contractStartDate: [this.rentData.contractStartDate,
      [Validators.required, dateBeforeValidator(new Date())]],
      contractEndDate: [this.rentData.contractEndDate,
      [Validators.required, observableDateBeforeValidator(this.formStartDate$.asObservable())]],
    });

    this.listenToStartDate();
    this.calculatePrice();
  }

  showPriceMsg() {
    this.priceMsgVisible = !this.priceMsgVisible;
  }

  calculatePrice() {
    let start: Date;

    this.rentForm.get('contractStartDate').valueChanges.subscribe(
      startChange => {
        start = startChange;
      }
    );

    this.rentForm.get('contractEndDate').valueChanges.subscribe(
      endChange => {
        this.price = Calculator.timeDiffInDays(start, endChange, this.selectedCar.carCategory.dailyCost);
      });
  };

  listenToStartDate() {
    this.rentForm.get('contractStartDate').valueChanges.subscribe(
      date => this.formStartDate$.next(date)
    );
  }

  rent() {
    this.rentData = this.rentForm.value;
    this.rentData.carID = this.selectedCar.id;

    this.carService.rent(this.rentData);
  }
}
