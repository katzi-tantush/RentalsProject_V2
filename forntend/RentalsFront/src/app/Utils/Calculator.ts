import { CarCategory } from "../models/Car-Models/CarCategory";
import { RentData } from "../models/Car-Models/RentData";

export class Calculator{
    static preRentCost(earlyDate: Date, lateDate: Date, dailyCost: number): number | null {
        // let timeDiffMilliseconds: number = new Date(lateDate).getTime() - new Date(earlyDate).getTime();
        // let timeDiffDays: number = Math.ceil(timeDiffMilliseconds / (1000 * 60 * 60 * 24))
        // if (timeDiffMilliseconds < 0) {
        //     return null;
        // }
        let daysDiff: number | null = Calculator.DaysDiff(earlyDate, lateDate);

        if (daysDiff == null) {
            return null;
        }
        return daysDiff * dailyCost;
    }

    static postReturnCost(rentData: RentData, carReturnDate:Date, category: CarCategory): number {
        let price: number = 0;
        if (carReturnDate > rentData.contractEndDate) {
            price += Calculator.preRentCost(rentData.contractStartDate, rentData.contractEndDate, category.dailyCost);
            price += Calculator.overdueRentCost(rentData.contractEndDate, carReturnDate, category.overdueDailyCost);
            return price;
        }
        else {
            price += Calculator.preRentCost(rentData.contractStartDate, carReturnDate, category.dailyCost);
            return price;
        }
    }

    private static DaysDiff(earlyDate:Date, lateDate:Date):number | null{
        let timeDiffMilliseconds: number = new Date(lateDate).getTime() - new Date(earlyDate).getTime();
        let timeDiffDays: number = Math.ceil(timeDiffMilliseconds / (1000 * 60 * 60 * 24))
        if (timeDiffMilliseconds < 0) {
            return null;
        }
        return timeDiffDays
    }

    private static overdueRentCost(endDate: Date, returnDate: Date, overdueCoset: number): number {
        let daysDiff: number = Calculator.DaysDiff(endDate, returnDate);
        return daysDiff * overdueCoset;
    }

}