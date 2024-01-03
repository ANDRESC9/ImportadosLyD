import { Component,EventEmitter, Output } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { ApiService } from 'src/app/services/api.service';
import { Debtor } from '../interfaces/debtor';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DateServicesService } from 'src/app/services/date-services.service';
import { ValidatorsCA } from 'src/app/utils/ValidatorsCA';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent {
  form_debtor! : FormGroup
  form_credit! : FormGroup;
  debtors! : Array<Debtor>
  @Output() close_modal = new EventEmitter<boolean>();
  loader_status! : boolean

  constructor(private api : ApiService<Debtor>, 
    private builder :  FormBuilder,
    private date : DateServicesService,
    private route : Router
    
    ){
    
 
    this.form_credit = this.builder.group(
      {
        id_debtor : ["", [Validators.required, ValidatorsCA.requiredSelected]],
        value : ["",[Validators.required, Validators.min(1000), Validators.max(100000000), Validators.pattern('^[0-9]*$')]],
        date : [""]
      }
    )
  }

  ngOnInit(){

    this.api.load_debtors("debtors/")
    
    this.api.get_debtors()
      .subscribe(data =>{
        this.debtors = data
        
      })
  }
  send(){
    
    console.log(this.form_credit.valid)
    if(this.form_credit.valid){
      this.form_credit.value.date  = this.date.now()
      this.api.create("http://127.0.0.1:8000/api/debtorscredits_create/", this.form_credit.value)
        .subscribe((response : Response)=>{
          console.log(this.form_credit.value)
          if(response.Status){
            this.close_window()
            this.loader_status = false
            this.route.navigate(["creditos/tabla"])
          }
          this.api.getAllPost("debtorscredits/")
        })
    }else{
      this.form_credit.markAllAsTouched();
    }
  }
  close_window(){
    this.close_modal.emit(false)
    this.form_credit.reset()
  }
}