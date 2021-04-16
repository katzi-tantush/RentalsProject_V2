import { Branch } from "./Branch";
import { CarCategory } from "./CarCategory";

export class Car{
    id: number;
    killometerCount: number;
    availableForRent: boolean;
    carCategory?: CarCategory;
    branch?: Branch;
    imagePath: string;
}