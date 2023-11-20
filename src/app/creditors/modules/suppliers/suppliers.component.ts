import { Component } from '@angular/core';
import { Supplier } from '../../interfaces/supplier';
import { Api_Service } from '../../services/api.service';
import { Response } from 'src/app/interfaces/response';
import { AbcComponentService } from 'src/app/ABC/abc-component.service'; 
import { Generics } from 'src/app/credits/interfaces/Generics';
import { ModalService } from '../../services/modal.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})

export class SuppliersComponent extends AbcComponentService<Supplier> implements Generics<Supplier> {

  suppliers! : Supplier[]

  constructor(
    private api : Api_Service<Supplier>,
    private modal_service : ModalService,
    
    ){
    super(api)
  }
  

  ngOnInit(){

    this.api.load_all("suppliers/")

    this.api.get_all()
    .subscribe((res : Response)=>{

      this.suppliers = res.Data
    })
     
  }

   pageChanged(event : any) {
    this.currentPage = event;
  }

   open_filter(): void {

    this.modal_service.open_modal("modal_filter_suppliers", true)

    this.modal_service.get_modal_status$("modal_filter_suppliers")
      .subscribe((sta : boolean)=>{
        this.open_filter_modal = sta
      })
  }

  open_modal_edit(model: Supplier): void {
    
    this.modal_service.open_modal("modal_edit_suppliers", true)

    this.modal_service.get_modal_status$("modal_edit_suppliers")
      .subscribe((sta : boolean)=>{
        this.open_edit_modal = sta
      })

    this.api.get_details(model.id_suppliers, "id_suppliers")  
    
  }
  delete_record(model : any){
    
    const delete_params = {id : model, table : "suppliers", column : "id_suppliers"}
    
    this.delete(model.id_supplier,"suppliers/", delete_params)
  }

  open_modal(): void {
    console.log("asda")
  }


  send(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(){

    this.api.clearData()
  }


}
