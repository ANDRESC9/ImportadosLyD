import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalInventoryService {

  private modal_status! : boolean
  private modal_status$! : BehaviorSubject<boolean>
  private modals_status : { [key: string]: BehaviorSubject<boolean> } = {
    "modal_create_product" : new BehaviorSubject<boolean>(false),
    "modal_edit_product" : new BehaviorSubject<boolean>(false),
    "modal_filter_product" : new BehaviorSubject<boolean>(false)
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
