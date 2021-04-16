import { BehaviorSubject, Observable } from "rxjs";
import { ISkeletonCar } from "../Interfaces/ISkeletonCar";
import { Branch } from "../models/Car-Models/Branch";
import { Car } from "../models/Car-Models/Car";
import { CarCategory } from "../models/Car-Models/CarCategory";

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
}