import { Car } from "../models/Car-Models/Car";
import { RentData } from "../models/Car-Models/RentData";

export interface IRentHistory{
    car: Car;
    rentHistory: RentData
}