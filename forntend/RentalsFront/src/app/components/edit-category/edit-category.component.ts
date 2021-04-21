import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarCategory } from 'src/app/models/Car-Models/CarCategory';
import { CarsService } from 'src/app/services/cars.service';
import { numberValidator } from 'src/app/validators/numberValidator';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @Input() category: CarCategory;
  categoryForm: FormGroup;

  constructor(
    private carService: CarsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      id: [this.category.id],
      manufacturer: [this.category.manufacturer],
      model: [this.category.model],
      automatic: [this.category.automatic],
      productionDate: [this.category.productionDate],
      dailyCost: [this.category.dailyCost, [Validators.required, numberValidator()]],
      overdueDailyCost: [this.category.overdueDailyCost, [Validators.required, numberValidator()]]
    });
  }

  updateCategory() {
    let category: CarCategory = this.categoryForm.value;
    this.carService.putCategory(category);
  }

  deleteCategory() {
    let confirm: boolean =
      window.confirm('Are you sure you want to delete this category? could be more trouble than its worth..');
    
    if (confirm) {
      this.carService.deleteCategory(this.category);
    }
  }
}
