import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Credit } from '../interfaces/credit';
import { Debtor } from '../interfaces/debtor';
import { LoadModalsService } from '../Services/load-modals.service';
import { DateServicesService } from 'src/app/services/date-services.service';
import { ValidatorsCA } from 'src/app/utils/ValidatorsCA';

@Component({
  selector: 'app-credits-paid-filter',
  templateUrl: './credits-paid-filter.component.html',
  styleUrls: ['./credits-paid-filter.component.css']
})
export class CreditsPaidFilterComponent {
  form_filter_paid! : FormGroup
  debtors! : Debtor[]
  loader_status! : boolean

  constructor(private form_build : FormBuilder, private api : ApiService<Credit>, private modals : LoadModalsService, private date : DateServicesService){

    this.form_filter_paid = this.form_build.group({
      option : ["", [Validators.required, ValidatorsCA.requiredSelected]],
      value : [this.date.Date(), Validators.required]
    })
  }

  ngOnInit(){

    this.api.load_debtors("debtors/")
    this.api.get_debtors()
      .subscribe((debs : Debtor[]) =>{

        this.debtors = debs
      })   
  }

  close_modal_filter(){
    this.modals.set_modal_filter_Status_paid(false)
    this.form_filter_paid.reset()
  }

  send(){

    this.loader_status = true
    if(this.form_filter_paid.valid){
      let values = this.form_filter_paid.value
      this.api.set_filter_credits_table(values, "debtorscredits_paids_filter/")
        .then((status : boolean)=>{
          if(status){
            
            this.close_modal_filter()
            this.loader_status = false
          }else{
            console.log("mostrar notificacion de error ")
          }
        }).catch((error)=>{

          console.log("error al filtrar tabla" + error)
        })
    }else{
      this.form_filter_paid.markAllAsTouched();
    }
  }

}
