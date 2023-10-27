import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/app/creditors/interfaces/supplier';
import { Supplier_debts } from 'src/app/creditors/interfaces/suppliers_debts';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Response } from 'src/app/interfaces/response';
@Component({
  selector: 'app-filter-suppliers-debts',
  templateUrl: './filter-suppliers-debts.component.html',
  styleUrls: ['./filter-suppliers-debts.component.css']
})

  
export class FilterSuppliersDebtsComponent{

  form_filter_suppliers_debts! : FormGroup
  suppliers! : Supplier[]

  constructor(private builder : FormBuilder, private api : Api_Service<Supplier_debts>, private modal_service : ModalService){

    this.form_filter_suppliers_debts = this.builder.group({

      option : ["" ,[Validators.required]],
      value: [""] 
    })
  }

  ngOnInit(){

    this.api.load_all("suppliers/", "selects")

    this.api.get_all("selects")
      .subscribe((res : Response)=>{
        console.log(res)
        this.suppliers = res.Data
      })
  }
  send(){

    if(this.form_filter_suppliers_debts.valid){
      this.form_filter_suppliers_debts.value.option = "'" + this.form_filter_suppliers_debts.value.option + "'"
      this.form_filter_suppliers_debts.value.value = "'" + this.form_filter_suppliers_debts.value.value + "'"
      console.log(this.form_filter_suppliers_debts.value)
      this.api.filter("suppliersdebts_filter", this.form_filter_suppliers_debts.value)

    }else{  

      this.form_filter_suppliers_debts.markAllAsTouched()
    }
  }

  close_modal_filter(){

    this.modal_service.open_modal("modal_filter_suppliers_debts",false)
  }

  ngOnDestroy(){

    this.api.clearData("selects")
  }
}
