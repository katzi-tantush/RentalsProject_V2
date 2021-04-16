import { AbstractControl, ValidatorFn } from "@angular/forms";
import { ValidatorException } from "../models/validatorException";
// TODO: not working - fix it!!!st
export function dateValidator(): ValidatorFn{
    return (control: AbstractControl): ValidatorException | null => {
        let exception: ValidatorException = { key: 'invalidDateFormat', value: 'invalid date format' };

        if (!(control && control.value))
            return exception;
        
        let stringOnly: boolean = true;
        control.value.forEach(char => {
            stringOnly = isNaN(char) ? stringOnly : false;
        });

        return (stringOnly) ?
            null :
            exception;
    }
}