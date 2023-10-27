import { Component } from '@angular/core';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Supplier_debts } from 'src/app/creditors/interfaces/suppliers_debts';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Response } from 'src/app/interfaces/response';
@Component({
  selector: 'app-suppliers-debts',
  templateUrl: './suppliers-debts.component.html',
  styleUrls: ['./suppliers-debts.component.css']
})
export class SuppliersDebtsComponent extends AbcComponentService<Supplier_debts>{
  public suppliers_debts! : Supplier_debts[]

  constructor(private api : Api_Service<Supplier_debts>, private modal_services : ModalService){
    super(api)
  }
  ngOnInit(){

    this.api.load_all("suppliersdebts/")

    this.api.get_all()
      .subscribe((res: Response)=>{
        this.suppliers_debts = res.Data
        console.log(res.Data)
      })
    
  }
  open_filter(){

    this.modal_services.open_modal("modal_filter_suppliers_debts", true)
    this.modal_services.get_modal_status$("modal_filter_suppliers_debts")
      .subscribe((res : boolean)=>{
          this.open_filter_modal = res
      })
  }
  pass(supplier_debts : Supplier_debts){}
  pay_off(supplier_debts : Supplier_debts){}

  pageChanged(event : any){

    this.currentPage = event
  }

  ngOnDestroy(){
    this.api.clearData()
  }
}
