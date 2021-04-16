import { AbstractControl, ValidatorFn } from "@angular/forms";
import { ValidatorException } from "../models/validatorException";

export function dateBeforeValidator(referanceDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidatorException | null => {
        let exception: ValidatorException = { key: 'invalidDate', value: `input date must be before ${referanceDate}` };

        if (!(control && control.value))
            return exception;
        
        let controlDate: Date = new Date(control.value);
        let validDate: boolean = controlDate > new Date(referanceDate);

        return (validDate) ?
            null :
            exception;
    }
}