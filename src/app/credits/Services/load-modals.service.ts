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

  private open_form_edit : boolean = false;
  private open_form_edit$! : BehaviorSubject<boolean>

  private open_filter_history : boolean = false;
  private open_filter_history$! : BehaviorSubject<boolean>

  constructor() {

    this.open_filter$ = new BehaviorSubject<boolean>(false)
    this.loader_status$ = new BehaviorSubject<boolean>(false)
    this.form_debtors_status$ = new BehaviorSubject<boolean>(false)
    this.open_form_edit$ = new BehaviorSubject<boolean>(false)
    this.open_filter_history$ = new BehaviorSubject<boolean>(false)
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

   set_form_debtors_status(status : boolean){

    this.form_debtors = status
    this.form_debtors_status$.next(this.form_debtors)
   }

   get_status_form_debtor(): Observable<boolean>{

    return this.form_debtors_status$.asObservable()

   }

   set_form_edit_debtors_status(status : boolean){

    this.open_form_edit = status
    this.open_form_edit$.next(this.open_form_edit)
   }

   get_status_form_edit_debtors(): Observable<boolean>{

    return this.open_form_edit$.asObservable()

   }

   set_modal_filter_Status(status : boolean){

    this.open_filter_history = status
    this.open_filter_history$.next(this.open_filter_history)
   }

   get_modal_filter_Status(): Observable<boolean>{

    return this.open_filter_history$.asObservable()

   }


}
