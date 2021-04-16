import { AbstractControl, ValidatorFn } from "@angular/forms";
import { ValidatorException } from "../models/validatorException";

export function charCountValidator(charCount:number): ValidatorFn{
    return (control: AbstractControl): ValidatorException | null => {
        let exception: ValidatorException = { key: 'invalidCharCount', value: 'character count is invalid' };

        if (!(control && control.value))
            return exception;
        
        let validCharCount: boolean = control.value.toString().length == charCount;
        
        return (validCharCount) ?
            null :
            exception;
    }
}