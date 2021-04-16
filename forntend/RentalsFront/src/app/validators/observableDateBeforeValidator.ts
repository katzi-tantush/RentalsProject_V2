import { AbstractControl, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { ValidatorException } from "../models/validatorException";

export function observableDateBeforeValidator(referanceDate: Observable<Date>): ValidatorFn {
    return (control: AbstractControl): ValidatorException | null => {
        
        let dateValue: Date;
        referanceDate.subscribe(
            value => {
                dateValue = value;
            }
        );

        let exception: ValidatorException = { key: 'invalidDate', value: `input date must be before ${dateValue}` };

        if (!(control && control.value))
            return exception;
        
        let controlDate: Date = control.value;
        let validDate: boolean = controlDate > dateValue;
        
        return (validDate) ?
            null :
            exception;
    }
}