import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Debtor } from '../interfaces/debtor';

@Component({
  selector: 'app-edit-debtor',
  templateUrl: './edit-debtor.component.html',
  styleUrls: ['./edit-debtor.component.css']
})
export class EditDebtorComponent {

  form_debtor_edit! : FormGroup;
  constructor(private builder : FormBuilder, private api : ApiService<Debtor>){

    this.form_debtor_edit = this.builder.group(
      {
        id_debtor : ["", [Validators.required]],
        value : ["" ,[Validators.required]],
        date : ["" ]
      }
    )

  }

  ngOnInit(){

    
  }

  send(){}
  close_form(){}
}
