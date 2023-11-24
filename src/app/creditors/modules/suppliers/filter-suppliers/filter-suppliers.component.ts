import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Supplier } from 'src/app/creditors/interfaces/supplier';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';

@Component({
  selector: 'app-filter-suppliers',
  templateUrl: './filter-suppliers.component.html',
  styleUrls: ['./filter-suppliers.component.css']
})
export class FilterSuppliersComponent extends AbcComponentService<Supplier> {

  public form_filter_supplier! : FormGroup

  constructor(private builder : FormBuilder, private modal_service : ModalService, private api : Api_Service<Supplier>){
    super(api)
    this.form_filter_supplier = this.builder.group({

      name : ["", Validators.required]
    })
  }

  send(){

    //this.form_filter_supplier.value.name = "'" + this.form_filter_supplier.value.name + "'"

    if(this.form_filter_supplier.valid){

      this.send_data_form(this.form_filter_supplier,"suppliers_filter")
      this.close_modal_filter()
    }
    
    this.form_filter_supplier.markAllAsTouched()
  }

  close_modal_filter(){

    this.modal_service.open_modal("modal_filter_suppliers", false);
    this.form_filter_supplier.reset()
  }


}
