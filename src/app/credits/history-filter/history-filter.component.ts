import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Debtor } from '../interfaces/debtor';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent {

  form_filter_history! : FormGroup
  debtors! : Debtor[]
  constructor(private form_builder : FormBuilder, private api : ApiService<Debtor> ){

    this.form_filter_history = this.form_builder.group({

      option : [""],
      value : [""],
    })
  }

  ngOnInit(){

    this.api.load_debtors()
    this.api.get_debtors()
      .subscribe((debs : Debtor[]) =>{

        this.debtors = debs
      })
  }
  close_modal_filter(){


  }
  send(){}
}
