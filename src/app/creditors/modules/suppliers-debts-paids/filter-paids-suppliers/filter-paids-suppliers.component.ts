import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Suppliers_debts_paid } from 'src/app/creditors/interfaces/suppliers_debts_paid';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import {Subscription} from 'rxjs'
import { Response } from 'src/app/interfaces/response';
import { Supplier } from 'src/app/creditors/interfaces/supplier';

@Component({
  selector: 'app-filter-paids-suppliers',
  templateUrl: './filter-paids-suppliers.component.html',
  styleUrls: ['./filter-paids-suppliers.component.css']
})
export class FilterPaidsSuppliersComponent {

  form_paid_debts_filter!: FormGroup
  subscribe! : Subscription
  suppliers! : Supplier[]

  constructor(private builder : FormBuilder, private api : Api_Service<Suppliers_debts_paid>, private modal : ModalService){

    this.form_paid_debts_filter = this.builder.group({

      option : ["", Validators.required],
      value : ["", Validators.required]
    })
  }

  ngOnInit(){+
    
    this.api.load_all("suppliers/", "selects")

    this.subscribe = this.api.get_all("selects")
      .subscribe((res : Response)=>{
          this.suppliers = res.Data
        
      })

  }

  send(){
    const value_to_string = this.form_paid_debts_filter.value.value.toString();
    this.form_paid_debts_filter.value.value = value_to_string 
    console.log(this.form_paid_debts_filter.value)
    if(this.form_paid_debts_filter.valid){
 
      this.api.filter("suppliers_debts_paids_filter", this.form_paid_debts_filter.value)
        .then((status : boolean)=>{

          if(status){

            this.close_modal_filter()
          }
        })

    }else{  

      this.form_paid_debts_filter.markAllAsTouched()
    }
  }
  

  close_modal_filter(){

    this.modal.open_modal("modal_paid_suppliers_debts_filter", false)
    this.form_paid_debts_filter.reset()
  }
}
