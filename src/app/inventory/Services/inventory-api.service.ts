import { Injectable } from '@angular/core';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { Inventory } from '../interfaces/Inventory';
import { Product } from '../interfaces/Product';
import { HttpClient} from '@angular/common/http';
import { ApiConfigService } from 'src/app/services/api-config.service';
import { SessionService } from 'src/app/services/session.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from 'src/app/interfaces/response';
import { Profit } from '../interfaces/Profit';
import { DateServicesService } from 'src/app/services/date-services.service';
@Injectable({
  providedIn: 'root'
})
export class InventoryApiService extends Api_Service<Product | Inventory>{
  inventory_subject! : Response
  inventory_subject$! : BehaviorSubject<Response>
  profit! : Profit
  profit_subject$! : BehaviorSubject<Profit>
  constructor(private http_ : HttpClient, private con_ : ApiConfigService, private session_ : SessionService, private date : DateServicesService) {

    super(http_, con_, session_)
    this.inventory_subject$ = new BehaviorSubject<Response>({} as Response)
    this.profit_subject$ = new BehaviorSubject<Profit>({date_profit : this.date.now()})
  
   }

   async load_inventory(url : string, data : any){

    this.http_.post<Response>(this.con_.base_url + url,data, this.options)
      .subscribe((res : Response)=>{
        this.inventory_subject = res
        this.inventory_subject$.next(this.inventory_subject)
      })

   }

   get_inventory_subject$() : Observable<Response>{

    return this.inventory_subject$.asObservable()
   }

   async update_profit(field : string,profit_ : Profit){

    let last_values : Profit = this.profit_subject$.getValue()
    
    switch(field){

      case "total_box":
        last_values.total_box = profit_.total_box

      break
      case "total_unit":
        
      last_values.total_unit = profit_.total_unit

      break
    }

    this.profit_subject$.next(last_values)

    
   }

   get_profit$(): Observable<Profit> {

    return this.profit_subject$.asObservable()
   }

   get(url : string){

    return this.http_.get<Response>(this.con_.base_url + url, this.options)
   }

}
