import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadModalsService } from '../Services/load-modals.service';
import { DebtorsService } from '../Services/debtors.service';
import { Response } from 'src/app/interfaces/response';

@Component({
  selector: 'app-edit-debtor',
  templateUrl: './edit-debtor.component.html',
  styleUrls: ['./edit-debtor.component.css']
})
export class EditDebtorComponent {

  form_debtor_edit! : FormGroup;
  constructor(private builder : FormBuilder, 
    private modal : LoadModalsService,
    private debtor_service : DebtorsService
    ){

    this.form_debtor_edit = this.builder.group(
      {
        id_debtor : ["", [Validators.required]],
        names : ["" ,[Validators.required]],
        lastnames : ["" ]
      }
    )

  }

  ngOnInit(){

    this.debtor_service.get_debtor()
      .subscribe((res : Response)=>{

        console.log(res)
      })
    this.form_debtor_edit.patchValue({
      id_debtor : [],
      names : [ ],
      lastnames : []
    })
  }

  send(){}

  close_form(){

    this.modal.set_form_edit_debtors_status(false)
  }
}
