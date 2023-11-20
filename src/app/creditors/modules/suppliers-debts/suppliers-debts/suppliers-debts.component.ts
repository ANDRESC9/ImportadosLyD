import { Component } from '@angular/core';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Supplier_debts } from 'src/app/creditors/interfaces/suppliers_debts';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Response } from 'src/app/interfaces/response';
import { DateServicesService } from 'src/app/services/date-services.service';
import { TransformDataService } from 'src/app/services/transform-data.service';
@Component({
  selector: 'app-suppliers-debts',
  templateUrl: './suppliers-debts.component.html',
  styleUrls: ['./suppliers-debts.component.css']
})
export class SuppliersDebtsComponent extends AbcComponentService<Supplier_debts>{
  public suppliers_debts! : Supplier_debts[]

  constructor(private api : Api_Service<Supplier_debts>,
     private modal_services : ModalService,
     private date : DateServicesService,
     private transform : TransformDataService
     ){
    super(api)
  }
  ngOnInit(){

    this.api.load_all("suppliersdebts/")

    this.api.get_all()
      .subscribe((res: Response)=>{
        this.suppliers_debts = res.Data
        //console.log(res.Data)
      })
    
  }
  open_filter(){

    this.modal_services.open_modal("modal_filter_suppliers_debts", true)
    this.modal_services.get_modal_status$("modal_filter_suppliers_debts")
      .subscribe((res : boolean)=>{
          this.open_filter_modal = res
      })
  }

  paid_off(debts : Supplier_debts){

    const data = {

      id : debts.id_suppliers_debts,
      date : "'" + this.date.now() + "'"
    }
    const current_balance = this.transform.money_to_number(debts.balance)
    if(current_balance != 0){
      if(window.confirm("La deuda actual cuenta con un saldo de " + debts.balance + " ¿Realmente quiere saldar esta deuda?")){
        this.send_data_with_params("suppliers_debts_paid_off", data)
          .then((res : Response)=>{
            if(res.Status){

              this.reload_list("suppliersdebts/")
            }
          }).catch((res : Response)=>{console.error(res.Messague)})
      }
    }else{

      alert("Error en el registro, por favor contactar con soporte")
    }
    
  }
  pass(supplier_debts : Supplier_debts){

    this.set_details(supplier_debts.id_suppliers_debts, "id_suppliers_debts")  
    
    this.modal_services.open_modal("modal_pass_suppliers_debts", true)
    this.modal_services.get_modal_status$("modal_pass_suppliers_debts")
      .subscribe((sta : boolean)=>{
        this.open_pass_modal = sta
        
      })
  }
  pay_off(supplier_debts : Supplier_debts){}

  pageChanged(event : any){
    this.currentPage = event
  }

  ngOnDestroy(){
    this.api.clearData()
  }
}
