import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DebtorsService } from '../Services/debtors.service';
import { Response } from 'src/app/interfaces/response';
import { LoadModalsService } from '../Services/load-modals.service';
import { Debtor } from '../interfaces/debtor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-debtor',
  templateUrl: './new-debtor.component.html',
  styleUrls: ['./new-debtor.component.css']
})
export class NewDebtorComponent {

  form_debtor! : FormGroup
  loader_status! : boolean
  constructor(private form_builder : FormBuilder,
    private deb_Service : DebtorsService,
    private modal :LoadModalsService,
    private api : ApiService<Debtor>,
    private route : Router
      ){

    this.form_debtor = this.form_builder.group({

      names : ["",[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastnames : ["",[Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

  send(){

    this.loader_status = true
    if(this.form_debtor.valid){

      this.deb_Service.create_debtor(this.form_debtor.value)
      .subscribe((response : Response)=>{
        
        if(response.Status){
          
          this.api.load_debtors("debtors/")
          this.close_form()
          this.form_debtor.reset()
          this.route.navigate(["creditos/lista_deudores"])
          this.loader_status = false
        }
      })
    }else{
        this.form_debtor.markAllAsTouched();
    } 
  }
  close_form(){

    this.modal.set_form_debtors_status(false)
  }
}
