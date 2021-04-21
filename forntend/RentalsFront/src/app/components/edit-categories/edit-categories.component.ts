import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarCategory } from 'src/app/models/Car-Models/CarCategory';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {
  categories$: Observable<CarCategory[]>;

  constructor(
    private carService: CarsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categories$ = this.carService.getCategoriesObs();
  }

  toNewCategoryForm() {
    this.router.navigate(['newCategoryFrom']);
  }

}
