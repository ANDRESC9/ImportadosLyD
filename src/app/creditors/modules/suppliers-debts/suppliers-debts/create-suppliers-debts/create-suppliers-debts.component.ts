import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Supplier } from 'src/app/creditors/interfaces/supplier';
import { Supplier_debts } from 'src/app/creditors/interfaces/suppliers_debts';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Response } from 'src/app/interfaces/response';
import { DateServicesService } from 'src/app/services/date-services.service';
import { ValidatorsCA } from 'src/app/utils/ValidatorsCA';
@Component({
  selector: 'app-create-suppliers-debts',
  templateUrl: './create-suppliers-debts.component.html',
  styleUrls: ['./create-suppliers-debts.component.css']
})

export class CreateSuppliersDebtsComponent extends AbcComponentService<Supplier_debts> {

  form_suppliers_debts! : FormGroup
  suscription! : Subscription
  suppliers! : Array<Supplier>
  constructor(private builder : FormBuilder,
    private api : Api_Service<Supplier_debts>,
    private modal_service : ModalService,
    private router : Router,
    private date : DateServicesService

      ){
    super(api)
    this.form_suppliers_debts = this.builder.group({
      supplier_fk : ["",[Validators.required,ValidatorsCA.requiredSelected]],
      value: ["",[Validators.required, Validators.min(1000), Validators.max(100000000), Validators.pattern('^[0-9]*$')]],
      date_debts : [""]
    })
  }

  ngOnInit(){

     this.api.load_all("suppliers/", "selects")

     this.suscription =  this.api.get_all("selects")
      .subscribe((res : Response)=>{
        this.suppliers = res.Data
      })
  }

  send(){

    this.form_suppliers_debts. value.date_debts = this.date.now()

    this.create_or_update("suppliersdebts_create",this.form_suppliers_debts)
    .then((res : Response)=>{
      console.log(res)
      if(res.Status){
        this.reload_list("suppliersdebts/")
        this.router.navigate(["/deudas/lista_deudas"])
        this.close_window()
        this.suscription.unsubscribe()
      }else{
        this.form_suppliers_debts.markAllAsTouched()
      }
    }, (res : Response)=> {

      this.form_suppliers_debts.markAllAsTouched()
      console.error(res.Messague)
    })

      
  }
  close_window(){

    this.modal_service.open_modal("modal_create_suppliers_debts", false)
   this.form_suppliers_debts.reset()
    
  }

  ngOnDestroy(){

    // this.form_suppliers_debts.reset()
    // // this.suscription.unsubscribe()
    // this.api.clearData("selects")
  }

}
