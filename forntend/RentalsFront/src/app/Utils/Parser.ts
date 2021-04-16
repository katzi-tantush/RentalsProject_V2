import * as moment from "moment";

export class Parser{
    static shortDateToString(strDate: string): string | null {
        if (!moment(strDate, 'DD/MM/YYYY', true).isValid()) {
            return null;
        }

        try {
            let dateParts: string[] = strDate.split('/');
            let date: Date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
            return date.toDateString();
        }
        catch {
            return null;
        }
    }

    static shortDateStringToDate(shortStringDate:string):Date {
        let date: Date = new Date(shortStringDate);

        return date;
    }

}