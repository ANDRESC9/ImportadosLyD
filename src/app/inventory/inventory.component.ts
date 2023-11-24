import { Component } from '@angular/core';
import { AbcComponentService } from '../ABC/abc-component.service';
import { Inventory } from './interfaces/Inventory';
import { ModalInventoryService } from './Services/modal-inventory.service';
import { Api_Service } from '../creditors/services/api.service';
import { Product } from './interfaces/Product';
import {Subscription} from 'rxjs'
import { Response } from '../interfaces/response';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent extends AbcComponentService<Inventory> {

  products! : Product[]
  subs! : Subscription 
  constructor(private modal_service : ModalInventoryService, private api : Api_Service<Inventory>){
    super(api)
  }

  

  open_modal_create_product(){

    this.modal_service.open_modal("modal_create_product", true)
    this.modal_service.get_modal_status$("modal_create_product")
      .subscribe(status=>{
          this.open_create_product_modal = status
      })
  } 
}
