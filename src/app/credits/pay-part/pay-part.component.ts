import { Component,EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Debtor } from '../interfaces/debtor'; 
import { Credit } from '../interfaces/credit';
import { Response } from 'src/app/interfaces/response';
import { DateServicesService } from 'src/app/services/date-services.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TransformDataService } from 'src/app/services/transform-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pay-part',
  templateUrl: './pay-part.component.html',
  styleUrls: ['./pay-part.component.css']
})
export class PayPartComponent {

  form_pass! : FormGroup;
  @Input() info_credit! : Credit;

  off : boolean = true;
  pass_error! : boolean;
  @Output() close = new EventEmitter<Boolean>

  constructor(private api : ApiService<Debtor>, 
    private builder :  FormBuilder, 
    private date_service : DateServicesService,
    private loader : LoaderService,
    private transform : TransformDataService,
    private route : Router
     ){
 
    this.form_pass = this.builder.group(
      {
        id_debtors_credits : ["",[Validators.required]],
        debtor_fk : ["",[Validators.required]],
        value : ["",[Validators.required]],
        date_debts : ["",[Validators.required]],
        names_ : ["",[Validators.required]],
        lastnames : ["",],
        date_last_pass : [this.date_service.now()],
        pass : ["",[Validators.required]],
        balance : ["",[Validators.required]],
        
      }
    )
  }

  ngOnInit(){

    this.loader.set_loader_status(true)
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

          this.loader.set_loader_status(true)
        }
  send(){


    if(this.form_pass.valid && !this.pass_error){

      this.loader.set_loader_status(true)
      let values = this.form_pass.value
      delete values.names_
      delete values.lastnames
      delete values.balance
      delete values.date_debts
      
      console.log(values)
      this.api.create("https://fruverapp.onrender.com/api/debtorscredits_edit/", values)
      .subscribe((response : Response) =>{
        console.log(response.Messague)
        if(response.Status){
          
          this.loader.set_loader_status(false)
          this.close_form()
          this.api.getAllPost("debtorscredits/")
          this.route.navigate(["creditos/tabla"])  
        }
      })
    }else{

      this.form_pass.markAllAsTouched()
    }
    
 }
 validate_pass(balance : number){
  
  let balance_ = this.transform.money_to_number(balance)
  let current_pass = this.form_pass.value.pass

  if(current_pass > balance_){

    this.pass_error = true

  }else {

    this.pass_error = false
  }

 }

 close_form(){
  this.close.emit(false);

  this.form_pass.reset()
 }
}
