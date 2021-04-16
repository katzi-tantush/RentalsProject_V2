export class Parser{
    static shortDateToString(strDate:string): string {
        let dateParts: string[] = strDate.split('/');
        let date: Date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

        return date.toDateString();
    }

    static shortDateStringToDate(shortStringDate:string):Date {
        let date: Date = new Date(shortStringDate);

        return date;
    }

    static dateToString(date:Date):string {
        let stringDate: string = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        return stringDate;
    }
}