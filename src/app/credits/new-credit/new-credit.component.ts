import { Component,EventEmitter, Output } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { ApiService } from 'src/app/services/api.service';
import { Debtor } from '../interfaces/debtor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credit } from '../interfaces/credit';

@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent {

  form_credit! : FormGroup;
  debtors! : Array<Debtor>
  @Output() close_modal = new EventEmitter<boolean>();

  constructor(private api : ApiService<Debtor>, private builder :  FormBuilder,
     private router : Router  ){
    
 
    this.form_credit = this.builder.group(
      {
        id_debtor : [""],
        value : [""]
      }
    )
  }

  ngOnInit(){

    this.api.load_debtors()
    
    this.api.get_debtors()
      .subscribe(data =>{
        this.debtors = data
      })
  }


  send(){

    if(this.form_credit.valid){

      this.api.create("https://fruverapp.onrender.com/api/debtorscredits_create/", this.form_credit.value)
        .subscribe((response : Response)=>{

          console.log(response.Messague)
          this.api.getAllPost("https://fruverapp.onrender.com/api/debtorscredits/")
        })
    }


    
  }


  close_window(){

    this.close_modal.emit(false)
  }
}
