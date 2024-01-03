import { Component } from '@angular/core';
import { Profit } from '../../interfaces/Profit';
import { DateServicesService } from 'src/app/services/date-services.service';
import { InventoryApiService } from '../../Services/inventory-api.service';
import {Subscription} from'rxjs'
import { Response } from 'src/app/interfaces/response';
@Component({
  selector: 'app-consolidated',
  templateUrl: './consolidated.component.html',
  styleUrls: ['./consolidated.component.css']
})
export class ConsolidatedComponent {

  profit! : Profit
  subs! : Subscription

  constructor(private api_inventory : InventoryApiService){

    this.profit = {}
  }

  ngOnInit(){


    this.subs = this.api_inventory.get_profit$()
      .subscribe((pro : Profit) =>{
        this.profit = pro
      })
    
      this.api_inventory.get("debtorscredits_total")
        .subscribe((res:Response)=>{
          this.profit.total_debts = res.Data[0].total_credit
        })
  
  }


  ngOnDestroy(){

    if(this.subs != null){
      this.subs.unsubscribe()
    }
    
  }
}
