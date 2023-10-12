import { Component,EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Debtor } from '../interfaces/debtor'; 
import { Credit } from '../interfaces/credit';
import { Response } from 'src/app/interfaces/response';



@Component({
  selector: 'app-pay-part',
  templateUrl: './pay-part.component.html',
  styleUrls: ['./pay-part.component.css']
})
export class PayPartComponent {

  form_pass! : FormGroup;
  @Input() info_credit! : Credit;
  off : boolean = true;
  is_load : boolean = true;
  @Output() close = new EventEmitter<Boolean>

  constructor(private api : ApiService<Debtor>, private builder :  FormBuilder
     ){
 
    this.form_pass = this.builder.group(
      {
        id_debtors_credits : ["",[Validators.required]],
        debtor_fk : ["",[Validators.required]],
        value : ["",[Validators.required]],
        date_debts : ["",[Validators.required]],
        names_ : ["",[Validators.required]],
        lastnames : ["",[Validators.required]],
        pass : ["",[Validators.required, Validators.minLength(3)]],
        balance : ["",[Validators.required]]
      }
    )
  }

  ngOnInit(){

        this.api.get_info_credit()
          .subscribe((credit : Credit)=>{

            this.form_pass.patchValue({
              id_debtors_credits : credit.id_debtors_credit,
              debtor_fk : credit.debtors_fk,
              value : credit.value_,
              date_debts : credit.date_debts,
              names_ : credit.names_,
              lastnames : credit.lastnames,
              balance : credit.balance
            })
          })
        }
  send(){

    this.is_load = false
    let values = this.form_pass.value
    delete values.names_
    delete values.lastnames
    delete values.balance
    delete values.date_debts

    this.api.create("https://fruverapp.onrender.com/api/debtorscredits_edit/", values)
      .subscribe((response : Response) =>{
        this.is_load = response.Status
        console.log(response.Messague)
        
        if(response.Status){
          this.api.getAllPost("debtorscredits/")
            
        }else{
          this.is_load = true
        }
      })
 }

 close_form(){
  this.close.emit(false);
 }
}
