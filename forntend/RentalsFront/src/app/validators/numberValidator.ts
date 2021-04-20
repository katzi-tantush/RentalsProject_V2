import { AbstractControl, ValidatorFn } from "@angular/forms";
import { ValidatorException } from "../models/validatorException";

export function numberValidator(): ValidatorFn{
    return (control: AbstractControl): ValidatorException | null => {
        let exception: ValidatorException = { key: 'isNaN', value: 'value must be a whole number' };

        if (!(control && control.value))
            return exception;
        
        let validNumber: boolean = Number.isInteger(+control.value) && +control.value > 0;

        return (validNumber) ?
            null :
            exception;
    }
}