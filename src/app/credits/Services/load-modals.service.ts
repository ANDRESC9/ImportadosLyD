import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadModalsService {

  private open_filter : boolean = false;
  private open_filter$! : BehaviorSubject<boolean>

  private loader_status : boolean = false;
  private loader_status$! : BehaviorSubject<boolean>

  private form_debtors : boolean = false
  private form_debtors_status$! : BehaviorSubject<boolean>
  constructor() {

    this.open_filter$ = new BehaviorSubject<boolean>(false)
    this.loader_status$ = new BehaviorSubject<boolean>(false)
    this.form_debtors_status$ = new BehaviorSubject<boolean>(false)
   }

   open_modal(state : boolean){

    this.open_filter = state
    this.open_filter$.next(state)

   }

   get_status() : Observable<boolean>{

    return this.open_filter$.asObservable()
   }

   set_status_loader(state : boolean){

    this.loader_status = state
    this.loader_status$.next(state)
   }

   get_loader_status() : Observable<boolean>{

    return this.loader_status$.asObservable()

   }

   set_form_debtors_status(){

    
   }
}
