import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DebugInterceptor } from './interceptors/debugInterceptor';
import { RegisterComponent } from './components/register/register.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarComponent } from './components/car/car.component';
import { WorkerOptionsComponent } from './components/worker-options/worker-options.component';
import { RentDetailsComponent } from './components/rent-details/rent-details.component';
import { RentHistoryComponent } from './components/rent-history/rent-history.component';
import { CarDealComponent } from './components/car-deal/car-deal.component';
import { WelcomeUserComponent } from './components/welcome-user/welcome-user.component';
import { RentHistoryViewComponent } from './components/rent-history-view/rent-history-view.component';
import { RetunCarsComponent } from './components/retun-cars/retun-cars.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    LayoutComponent,
    RegisterComponent,
    CarsComponent,
    CarComponent,
    WorkerOptionsComponent,
    RentDetailsComponent,
    RentHistoryComponent,
    CarDealComponent,
    WelcomeUserComponent,
    RentHistoryViewComponent,
    RetunCarsComponent,
    DatePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:DebugInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
