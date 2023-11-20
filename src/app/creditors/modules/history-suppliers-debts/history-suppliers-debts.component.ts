import { Component } from '@angular/core';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { History_debts } from '../../interfaces/history_debts';
import { Api_Service } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Response } from 'src/app/interfaces/response';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-history-suppliers-debts',
  templateUrl: './history-suppliers-debts.component.html',
  styleUrls: ['./history-suppliers-debts.component.css']
})
export class HistorySuppliersDebtsComponent extends AbcComponentService<History_debts>  {

  debts_history! : History_debts[]
  subs! : Subscription
  constructor(private api : Api_Service<History_debts>, alert : AlertService){
    super(api)
  }
  async ngOnInit(){

    await this.api.load_all("suppliers_debts_history/")

    this.subs = this.api.get_all()
      .subscribe((res : Response)=>{

        if(res.Status){
          console.log(res.Status)
           this.debts_history = res.Data
        }
        // }else{
        //   console.log(res.Status)
        //   this.alert.set_alert({
        //     message : "Error al obtener registros de historial",
        //     status : true,
        //     class : "alert-danger"
        //   })
        // }
      })
  }

  open_filter_history(){}

  pageChanged(event : any){}


  ngOnDestroy(){

    this.subs.unsubscribe()
  }
}
