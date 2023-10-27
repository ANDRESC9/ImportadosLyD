import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ModalService } from './services/modal.service';
import { AbcComponentService } from '../ABC/abc-component.service';
import { Supplier } from './interfaces/supplier';
import { Api_Service } from './services/api.service';

@Component({
  selector: 'app-creditors-menu',
  templateUrl: './creditors-menu.component.html',
  styleUrls: ['./creditors-menu.component.css']
})
export class CreditorsMenuComponent extends AbcComponentService<Supplier> {
  add_class : boolean = false;
  loader_status! : boolean;
  open_new_debtor : boolean = false; 

  constructor(private modal_service : ModalService, private api : Api_Service<Supplier>){
    super(api)

  }
  ngOnInit(){
   

  }
  open_table(){

  }

  close(data : boolean){


    
  }

  show_pays(){

    


  }

  show_credits(){



  }



  open_form_debtor(){

   
    
  }

  open_modal_create(){

    this.modal_service.open_modal("modal_create_suppliers", true)

    this.modal_service.get_modal_status$("modal_create_suppliers")
      .subscribe((sta : boolean)=>{
        this.open_create_modal = sta
      })
  }
}
