import { Component,EventEmitter, Output } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { ApiService } from 'src/app/services/api.service';
import { Debtor } from '../interfaces/debtor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateServicesService } from 'src/app/services/date-services.service';

@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent {

  form_credit! : FormGroup;
  debtors! : Array<Debtor>
  @Output() close_modal = new EventEmitter<boolean>();

  constructor(private api : ApiService<Debtor>, 
    private builder :  FormBuilder,
    private date : DateServicesService  ){
    
 
    this.form_credit = this.builder.group(
      {
        id_debtor : ["", [Validators.required]],
        value : ["" ,[Validators.required]],
        date : ["" ]
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
      this.form_credit.value.date  = this.date.now()
      this.api.create("https://fruverapp.onrender.com/api/debtorscredits_create/", this.form_credit.value)
        .subscribe((response : Response)=>{

          console.log(response.Messague)
          this.api.getAllPost("debtorscredits/")
        })
    }else{

      console.log("error en formulario")
    }
    
  }

  close_window(){

    this.close_modal.emit(false)
  }
}
