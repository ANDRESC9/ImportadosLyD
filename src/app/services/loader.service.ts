import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader_status! : boolean
  private loader_status$! : BehaviorSubject<boolean>
  constructor() {

    this.loader_status$ = new BehaviorSubject<boolean>(false)
   }


  set_loader_status(status : boolean){

    this.loader_status = status
    this.loader_status$.next(this.loader_status)
  }
  
  get_loader_status() : Observable<boolean>{

    return this.loader_status$.asObservable()
  }
}
