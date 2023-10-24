import { AbstractControl } from "@angular/forms";

export class ValidatorsCA{

    static requiredSelected(control : AbstractControl){

        const value = control.value
        if(value == 0){

            return {requiredSelected : true}
        }

        return null
    }
}