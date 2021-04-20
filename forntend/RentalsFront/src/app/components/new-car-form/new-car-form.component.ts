import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Branch } from 'src/app/models/Car-Models/Branch';
import { Car } from 'src/app/models/Car-Models/Car';
import { CarCategory } from 'src/app/models/Car-Models/CarCategory';
import { CarsService } from 'src/app/services/cars.service';
import { charCountValidator } from 'src/app/validators/charCountValidator';
import { numberValidator } from 'src/app/validators/numberValidator';

@Component({
  selector: 'app-new-car-form',
  templateUrl: './new-car-form.component.html',
  styleUrls: ['./new-car-form.component.css']
})
export class NewCarFormComponent implements OnInit {
  private car: Car = new Car();
  categories$: Observable<CarCategory[]>;
  branches$: Observable<Branch[]>;
  carForm: FormGroup;

  constructor(
    private carService: CarsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.categories$ = this.carService.getCategoriesObs();
    this.branches$ = this.carService.getBranchesObs();

    this.carForm = this.formBuilder.group({
      id: [this.car.id, [Validators.required, charCountValidator(8), numberValidator()]],
      killometerCount: [this.car.killometerCount, [Validators.required, numberValidator()]],
      availableForRent: [this.car.availableForRent, [Validators.required]],
      imagePath: [this.car.imagePath, [Validators.required]],
      carCategory: [this.car.carCategory, [Validators.required]],
      branch: [this.car.branch, [Validators.required]]
    })
  }

  submitNewCar() {
    this.car = this.carForm.value;
    this.car.availableForRent = true;
    this.carService.postCar(this.car);
  }
}
