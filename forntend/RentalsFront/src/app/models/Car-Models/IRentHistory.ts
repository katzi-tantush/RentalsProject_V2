import { Car } from "./Car";
import { RentData } from "./RentData";

export interface IRentHistory{
    car: Car;
    rentData: RentData
}