import { AbstractControl } from "@angular/forms";

export class ValidatorsCA{

    static requiredSelected(control : AbstractControl){

        const value = control.value
        if(value < 1){

            return {requiredSelected : true}
        }

        return null
    }
}