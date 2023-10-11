import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadModalsService {

  private open_filter : boolean = false;
  private open_filter$! : BehaviorSubject<boolean>
  constructor() {

    this.open_filter$ = new BehaviorSubject<boolean>(false)

   }

   open_modal(state : boolean){

    this.open_filter = state
    this.open_filter$.next(state)

   }

   get_status() : Observable<boolean>{

    return this.open_filter$.asObservable()
   }
}
