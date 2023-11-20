import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Supplier } from 'src/app/creditors/interfaces/supplier';
import { Supplier_debts } from 'src/app/creditors/interfaces/suppliers_debts';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Response } from 'src/app/interfaces/response';
import { ValidatorsCA } from 'src/app/utils/ValidatorsCA';
@Component({
  selector: 'app-filter-suppliers-debts',
  templateUrl: './filter-suppliers-debts.component.html',
  styleUrls: ['./filter-suppliers-debts.component.css']
})

  
export class FilterSuppliersDebtsComponent{

  form_filter_suppliers_debts! : FormGroup
  suscription! : Subscription
  suppliers! : Supplier[]

  constructor(private builder : FormBuilder, private api : Api_Service<Supplier_debts>, private modal_service : ModalService){

    this.form_filter_suppliers_debts = this.builder.group({

      option : ["" ,[Validators.required , ValidatorsCA.requiredSelected]],
      value: ["", [Validators.required]] 
    })
  }

  ngOnInit(){

    this.api.load_all("suppliers/", "selects")

    this.suscription =  this.api.get_all("selects")
      .subscribe((res : Response)=>{
        //console.log(res)
        this.suppliers = res.Data
      })
  }
  send(){
    
    const value_to_string = this.form_filter_suppliers_debts.value.value.toString();
    this.form_filter_suppliers_debts.value.value = value_to_string 
    console.log(this.form_filter_suppliers_debts.value)
    if(this.form_filter_suppliers_debts.valid){

      
      this.api.filter("suppliersdebts_filter", this.form_filter_suppliers_debts.value)
        .then((status : boolean)=>{

          if(status){

            this.close_modal_filter()
          }
        })

    }else{  

      this.form_filter_suppliers_debts.markAllAsTouched()
    }
  }

  close_modal_filter(){

    this.modal_service.open_modal("modal_filter_suppliers_debts",false)
  }

  ngOnDestroy(){

    this.api.clearData("selects")
    this.suscription.unsubscribe()
  }
}
