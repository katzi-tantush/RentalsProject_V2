import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDealComponent } from './components/car-deal/car-deal.component';
import { CarsComponent } from './components/cars/cars.component';
import { EditCarsComponent } from './components/edit-cars/edit-cars.component';
import { EditCategoriesComponent } from './components/edit-categories/edit-categories.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewCarFormComponent } from './components/new-car-form/new-car-form.component';
import { NewCategoryFormComponent } from './components/new-category-form/new-category-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { RentHistoryComponent } from './components/rent-history/rent-history.component';
import { RetunCarsComponent } from './components/retun-cars/retun-cars.component';
import { WelcomeUserComponent } from './components/welcome-user/welcome-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'carDeal', component: CarDealComponent },
  { path: 'welcomeUser', component: WelcomeUserComponent },
  { path: 'rentHistory', component: RentHistoryComponent },
  { path: 'returnCars', component: RetunCarsComponent },
  { path: 'editCars', component: EditCarsComponent },
  { path: 'editUsers', component: EditUsersComponent },
  { path: 'editCategories', component: EditCategoriesComponent },
  { path: 'newCategoryFrom', component: NewCategoryFormComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
