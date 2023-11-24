import { Injectable } from '@angular/core';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { Inventory } from '../interfaces/Inventory';
import { Product } from '../interfaces/Product';
import { HttpClient} from '@angular/common/http';
import { ApiConfigService } from 'src/app/services/api-config.service';
import { SessionService } from 'src/app/services/session.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from 'src/app/interfaces/response';
@Injectable({
  providedIn: 'root'
})
export class InventoryApiService extends Api_Service<Product | Inventory>{
  inventory_subject! : Response
  inventory_subject$! : BehaviorSubject<Response> 

  constructor(private http_ : HttpClient, private con_ : ApiConfigService, private session_ : SessionService) {

    super(http_, con_, session_)
    this.inventory_subject$ = new BehaviorSubject<Response>({} as Response)
  
   }

   load_inventory(url : string){

    this.http_.get<Response>(this.con_.base_url + url, this.options)
      .subscribe((res : Response)=>{
        this.inventory_subject = res
        this.inventory_subject$.next(this.inventory_subject)
      })

   }

   get_inventory_subject$() : Observable<Response>{

    return this.inventory_subject$.asObservable()
   }

}
