import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Product } from 'src/app/inventory/interfaces/Product';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { ModalInventoryService } from 'src/app/inventory/Services/modal-inventory.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent extends AbcComponentService<Product> {

  public form_filter_product! : FormGroup

  constructor(private builder : FormBuilder, private modal_service : ModalInventoryService, private api : Api_Service<Product>){
    super(api)
    this.form_filter_product = this.builder.group({

      name : ["", Validators.required]
    })
  }

  send(){
    
    if(this.form_filter_product.valid){
      this.send_data_form(this.form_filter_product,"products_filter")
      this.close_modal_filter()
    }
    
    this.form_filter_product.markAllAsTouched()
  }

  close_modal_filter(){

    this.modal_service.open_modal("modal_filter_product", false);
    this.form_filter_product.reset()
  }
}
