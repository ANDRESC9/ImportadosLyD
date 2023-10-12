import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-debtor',
  templateUrl: './new-debtor.component.html',
  styleUrls: ['./new-debtor.component.css']
})
export class NewDebtorComponent {

  form_debtor! : FormGroup

  constructor(private form_builder : FormBuilder){

    this.form_debtor = this.form_builder.group({

      names : [Validators.required],
      lastnames : [Validators.required]
    })
  }

  send(){

    
  }

  
}
