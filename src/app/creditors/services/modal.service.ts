import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modal_status! : boolean
  private modal_status$! : BehaviorSubject<boolean>
  private modals_status : { [key: string]: BehaviorSubject<boolean> } = {
    "modal_filter_suppliers" : new BehaviorSubject<boolean>(false),
    "modal_edit_suppliers" : new BehaviorSubject<boolean>(false),
    "modal_create_suppliers" : new BehaviorSubject<boolean>(false),
    "modal_filter_suppliers_debts" : new BehaviorSubject<boolean>(false),
    "modal_create_suppliers_debts" : new BehaviorSubject<boolean>(false),
    "modal_paidoff_suppliers_debts" : new BehaviorSubject<boolean>(false),
    "modal_pass_suppliers_debts" : new BehaviorSubject<boolean>(false),
    "modal_paid_suppliers_debts_filter" : new BehaviorSubject<boolean>(false),
  }

  constructor() {

    this.modal_status$ = new BehaviorSubject<boolean>(false)
   }

   open_modal(modal_name : string, state : boolean){

    this.modals_status[modal_name].next(state)

   }

   get_modal_status$(modal_name : string): Observable<boolean>{

    return this.modals_status[modal_name].asObservable()

   }


}
