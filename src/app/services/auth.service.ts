import { Injectable } from '@angular/core';
import { Token } from '../interfaces/Token';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public current_token! : Token 
  public is_auth$!: BehaviorSubject<boolean>
  constructor() { 

    this.is_auth$ = new BehaviorSubject<boolean>(false)
  }

  set_login_status(status : boolean){

    this.is_auth$.next(status)
  }

  get_auth_state(): Promise<boolean>{

    return new Promise<boolean>((resolve,reject)=>{
      this.is_auth$.asObservable()
        .subscribe((status : boolean)=>{
          if(status){
            resolve(status)
          }else{
            reject(false)
          }
          
        })
    })
  }
}
