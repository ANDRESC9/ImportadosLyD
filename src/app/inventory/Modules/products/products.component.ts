import { Component } from '@angular/core';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Product } from '../../interfaces/Product';
import { Response } from 'src/app/interfaces/response';
import { Api_Service } from 'src/app/creditors/services/api.service';
import {Subscription} from 'rxjs'
import { ModalInventoryService } from '../../Services/modal-inventory.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends AbcComponentService<Product> {

  constructor(private api : Api_Service<Product>, private modal_service : ModalInventoryService){
    super(api)
  }

  products! : Product[]
  subs! : Subscription

  ngOnInit(){
    
    this.api.load_all("products/")

    this.api.get_all()
      .subscribe((res : Response)=>{
  
          console.log(res.Data)
          this.products = res.Data
        
      })
  }

  pageChanged(event : any){

    this.currentPage = event
  }

  open_modal_edit(produtc : Product){

    this.modal_service.open_modal("modal_edit_product", true)

    this.modal_service.get_modal_status$("modal_edit_product")
      .subscribe((sta : boolean)=>{
        this.open_edit_product_modal = sta
      })

    this.api.get_details(produtc.id_product, "id_product")  
  }

  delete_record(model : any){
    
    const delete_params = {id : model, table : "products", column : "id_product"}
    
    this.delete(model.id_product,"products/", delete_params)
  }
  
  open_filter(){

    this.modal_service.open_modal("modal_filter_product", true)

    this.modal_service.get_modal_status$("modal_filter_product")
      .subscribe((sta : boolean)=>{
        console.log(sta)
        this.open_filter_product_modal = sta
      })
  }

  ngOnDestroy(){

    this.subs.unsubscribe()
  }
}

