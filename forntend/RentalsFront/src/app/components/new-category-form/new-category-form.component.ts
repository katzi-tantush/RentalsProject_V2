import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarCategory } from 'src/app/models/Car-Models/CarCategory';
import { CarsService } from 'src/app/services/cars.service';
import { dateAfterValidator } from 'src/app/validators/dateAfterValidator';
import { dateBeforeValidator } from 'src/app/validators/dateBeforeValidator';
import { numberValidator } from 'src/app/validators/numberValidator';

@Component({
  selector: 'app-new-category-form',
  templateUrl: './new-category-form.component.html',
  styleUrls: ['./new-category-form.component.css']
})
export class NewCategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  newCategory: CarCategory = new CarCategory();

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarsService  
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      id: [this.newCategory.id],
      manufacturer: [this.newCategory.manufacturer, [Validators.required]],
      model: [this.newCategory.model, [Validators.required]],
      automatic: [this.newCategory.automatic, [Validators.required]],
      productionDate: [this.newCategory.productionDate, [Validators.required, dateAfterValidator(new Date())]],
      dailyCost: [this.newCategory.dailyCost, [Validators.required, numberValidator()]],
      overdueDailyCost: [this.newCategory.overdueDailyCost, [Validators.required, numberValidator()]]
    });
  }

  submitNewCategory() {
    if (this.categoryForm.valid) {
      this.newCategory = this.categoryForm.value;
      this.newCategory.id = 0;
      this.carService.postcategory(this.newCategory);
    }
  }
}
