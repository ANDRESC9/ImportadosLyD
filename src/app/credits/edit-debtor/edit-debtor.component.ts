import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadModalsService } from '../Services/load-modals.service';
import { DebtorsService } from '../Services/debtors.service';
import { Response } from 'src/app/interfaces/response';
import { Debtor } from '../interfaces/debtor';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-debtor',
  templateUrl: './edit-debtor.component.html',
  styleUrls: ['./edit-debtor.component.css']
})
export class EditDebtorComponent {

  form_debtor_edit! : FormGroup;
  debtor! : Debtor
  constructor(private builder : FormBuilder, 
    private modal : LoadModalsService,
    private debtor_service : DebtorsService,
    private api : ApiService<Debtor>
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
      .subscribe((debtor : Debtor)=>{
        this.form_debtor_edit.patchValue({
          id_debtor : debtor.id_debtors,
          names : debtor.names_,
          lastnames: debtor.lastnames
        })
        
      })
    
  }

  send(){

    if(this.form_debtor_edit.valid){

      this.debtor_service.update_debtor(this.form_debtor_edit.value)
        .subscribe((res : Response)=>{
          console.log(res.Messague)
          if(res.Status){
            this.api.load_debtors()
            this.close_form()
          }
        })

    }else{

      alert("Error al editar deudor")

    }
    

  }

  close_form(){

    this.modal.set_form_edit_debtors_status(false)
  }
}
