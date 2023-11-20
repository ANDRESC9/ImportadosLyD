import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  
  public alert! : BehaviorSubject<Alert> 
  public alert$! : Observable<Alert>
  constructor() { 

    this.alert = new BehaviorSubject<Alert>({} as Alert)
    this.alert$ = this.alert.asObservable()
  }


  set_alert(info_alert : Alert){


    this.alert.next(info_alert)

    
  }
}
