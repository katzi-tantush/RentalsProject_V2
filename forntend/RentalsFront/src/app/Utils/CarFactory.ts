import { BehaviorSubject, Observable } from "rxjs";
import { ISkeletonCar } from "../models/Car-Models/ISkeletonCar";
import { Branch } from "../models/Car-Models/Branch";
import { Car } from "../models/Car-Models/Car";
import { CarCategory } from "../models/Car-Models/CarCategory";
import { RentData } from "../models/Car-Models/RentData";
import { IRentHistory } from "../models/Car-Models/IRentHistory";

export class CarFactory{

    static BuildCar(skelliCar: ISkeletonCar, branch:Branch, category:CarCategory): Car {
        let car: Car = {
            id: skelliCar.id,
            killometerCount: skelliCar.killometerCount,
            availableForRent: skelliCar.availableForRent,
            branch: branch,
            carCategory: category,
            imagePath: `./../assets/carImages/${category.manufacturer} ${category.model}.jfif`
        }
        return car;
    }

    static carToSkeleton(car: Car): ISkeletonCar {
        let skelicar: ISkeletonCar = {
            id: car.id,
            killometerCount: car.killometerCount,
            availableForRent: car.availableForRent,
            carCategoryID: car.carCategory.id,
            branchID: car.branch.id
        }
        return skelicar;
    }

    static builRentHistoryArr(cars: Car[], rentDataArr:RentData[]): IRentHistory[] {
        let rentHistoryArr: IRentHistory[] = [];

        rentDataArr.forEach(rentData => {
            let rentHistory: IRentHistory = {
            car: cars.filter(c => c.id == rentData.carID)[0],
            rentData: rentData
        };
        rentHistoryArr.push(rentHistory);
      })

      return rentHistoryArr;
    }
}