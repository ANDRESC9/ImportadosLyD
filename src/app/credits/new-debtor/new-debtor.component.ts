import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DebtorsService } from '../Services/debtors.service';
import { Response } from 'src/app/interfaces/response';

@Component({
  selector: 'app-new-debtor',
  templateUrl: './new-debtor.component.html',
  styleUrls: ['./new-debtor.component.css']
})
export class NewDebtorComponent {

  form_debtor! : FormGroup

  constructor(private form_builder : FormBuilder, private deb_Service : DebtorsService){

    this.form_debtor = this.form_builder.group({

      names : ["",Validators.required],
      lastnames : ["",Validators.required]
    })
  }

  send(){

    this.deb_Service.create_debtor(this.form_debtor.value)
      .subscribe((response : Response)=>{
        console.log(response.Messague)
      })
  }

  
}
