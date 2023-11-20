import { Component } from '@angular/core';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Suppliers_debts_paid } from '../../interfaces/suppliers_debts_paid';
import { Api_Service } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Response } from 'src/app/interfaces/response';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-suppliers-debts-paids',
  templateUrl: './suppliers-debts-paids.component.html',
  styleUrls: ['./suppliers-debts-paids.component.css']
})
export class SuppliersDebtsPaidsComponent extends AbcComponentService<Suppliers_debts_paid> {

  debts_paids! : Suppliers_debts_paid[]
  subscription! : Subscription

  constructor(private api : Api_Service<Suppliers_debts_paid>, private modal : ModalService){
    super(api)
  }

  ngOnInit(){

    this.api.load_all("suppliers_debts_paids/")

    this.subscription = this.api.get_all()
      .subscribe((res : Response)=>{
        this.debts_paids = res.Data
      })
  }

  open_modal_filter(){
    
    this.modal.open_modal("modal_paid_suppliers_debts_filter", true)

    this.modal.get_modal_status$("modal_paid_suppliers_debts_filter")
      .subscribe(sta =>{
        this.open_paid_filter_modal = sta
      })
  }

  pageChanged(event : any){

    this.currentPage = event
  }

  ngOnDestroy(){

    this.subscription.unsubscribe()
  }
}
