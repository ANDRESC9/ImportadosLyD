import { Component } from '@angular/core';
import { LoadModalsService } from '../Services/load-modals.service';
import { Debtor } from '../interfaces/debtor';
import { ApiService } from 'src/app/services/api.service';
import { Response } from 'src/app/interfaces/response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-credits-filter',
  templateUrl: './credits-filter.component.html',
  styleUrls: ['./credits-filter.component.css']
})
export class CreditsFilterComponent {

  form_filter! : FormGroup
  debtors! : Debtor[]
  constructor(private modal : LoadModalsService, private api : ApiService<Debtor>, private form_build : FormBuilder){

    this.form_filter = this.form_build.group({
      date_filter : ["", Validators.required],
      debtors_fk : ["", Validators.required]
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

    this.modal.open_modal(false);
  }

  send(){

    console.log(this.form_filter.value)
  }
}
