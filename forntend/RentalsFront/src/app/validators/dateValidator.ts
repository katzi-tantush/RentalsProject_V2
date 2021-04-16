import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import * as moment from "moment";
import { ValidatorException } from "../models/validatorException";

export function dateValidator(): ValidatorFn{
    return (control: AbstractControl): ValidatorException | null => {
        let exception: ValidatorException = { key: 'invalidDateFormat', value: 'invalid date format' };

        if (!(control && control.value))
            return exception;
        
        let validDateFormatA: boolean = moment(control.value, 'DD/MM/YYYY', true).isValid();
        let validDateFormatB: boolean = moment(control.value, 'DD.MM.YYYY', true).isValid();

        return (validDateFormatA || validDateFormatB) ?
            null :
            exception;
    }
}