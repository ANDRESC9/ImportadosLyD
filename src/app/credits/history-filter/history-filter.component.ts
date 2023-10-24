import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Debtor } from '../interfaces/debtor';
import { ApiService } from 'src/app/services/api.service';
import { LoadModalsService } from '../Services/load-modals.service';
import { DebtorsService } from '../Services/debtors.service';
import { SingleQuotesService } from '../Services/single-quotes.service';
import { DateServicesService } from 'src/app/services/date-services.service';
import { ValidatorsCA } from 'src/app/utils/ValidatorsCA';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent {

  form_filter_history! : FormGroup
  debtors! : Debtor[]
  constructor(private form_builder : FormBuilder,
    private api : ApiService<Debtor>,
    private modal_services : LoadModalsService,
    private debtor_service : DebtorsService,
    private quotes : SingleQuotesService,
    private date : DateServicesService 
      ){

    this.form_filter_history = this.form_builder.group({
      option : ["", [Validators.required, ValidatorsCA.requiredSelected]],
      value : [this.date.Date()],
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
    this.modal_services.set_modal_filter_Status(false)
    this.form_filter_history.reset()
  }
  send(){
    if(this.form_filter_history.valid){
      this.form_filter_history.value.option = "'"+ this.form_filter_history.value.option + "'"
      this.form_filter_history.value.value = "'"+ this.form_filter_history.value.value + "'"

      if(this.form_filter_history.valid){
        this.debtor_service.filter_history( this.form_filter_history.value) 
        this.modal_services.set_modal_filter_Status(false)
      }else{
        alert("Verifique los filtros")
      } 
      this.form_filter_history.reset()
    }else{
      this.form_filter_history.markAllAsTouched();
    }
  }
}
