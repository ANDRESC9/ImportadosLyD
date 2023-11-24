import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Credit } from '../interfaces/credit';
import { LoadModalsService } from '../Services/load-modals.service'; 
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-debtors-filter',
  templateUrl: './debtors-filter.component.html',
  styleUrls: ['./debtors-filter.component.css']
})

export class DebtorsFilterComponent {

  form_filter_debtors! : FormGroup
  loader_status! : boolean

  constructor(private form_build : FormBuilder, 
    private api : ApiService<Credit>, 
    private modals : LoadModalsService,
    private loader : LoaderService
    ){

    this.form_filter_debtors = this.form_build.group({

      name : ["", Validators.required]

    })
  }

  send(){
    
    this.loader_status = true
      if(this.form_filter_debtors.valid){

      let value = this.form_filter_debtors.value
      //value.name = "'" + value.name + "'"
      this.api.set_filter_debtors(value)
        .then((status : boolean)=>{
          if(status){

            this.modals.set_modal_filter_Status_debtor(false)
            this.loader_status = false
          }
        })
    }else{
        this.form_filter_debtors.markAllAsTouched();
    } 
  }
  close_modal_filter(){
    this.modals.set_modal_filter_Status_debtor(false)
    this.form_filter_debtors.reset()
  }
}
