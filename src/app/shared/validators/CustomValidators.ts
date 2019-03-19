import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function requiredIf(isRequired: boolean): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if ((value == null || value === undefined || value === '') && isRequired) {
            return {
                requiredIf: { condition: isRequired }
            };
        }
        return null;
    };
}


export function requiredIfSibling(controlName: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if ((value == null || value === undefined || value === '')
            && control.parent
            && control.parent.get(controlName)
            && control.parent.get(controlName).value) {
            return {
                required: true
            };
        }
        return null;
    };
}

export function isValidTime(controlName: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if (value != null
            && control.parent
            && control.parent.get(controlName)
            && control.parent.get(controlName).value) {

            const start = (control.parent.get(controlName).value as Date).getTime();
            const end = (value as Date).getTime();

            if (end <= start) {
                return {
                    invalidTime: true
                };
            }
            return null;
        }
        return null;
    };
}

