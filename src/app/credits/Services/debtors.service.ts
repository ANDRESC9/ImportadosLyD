import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Credit_history } from '../interfaces/Credit_history';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiConfigService } from 'src/app/services/api-config.service';
import { Response } from 'src/app/interfaces/response';
import { Debtor } from '../interfaces/debtor';
import { Credit } from '../interfaces/credit';
import { DateServicesService } from 'src/app/services/date-services.service';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class DebtorsService {

  private credit_history! : Response;
  private credit_history$! : BehaviorSubject<Response>
  private debtor! : Debtor
  private debtor$! : BehaviorSubject<Debtor>
  private options: { headers: HttpHeaders } = {
    headers: new HttpHeaders()
  };
  constructor(protected http : HttpClient, private conf : ApiConfigService, private date : DateServicesService, private session : SessionService) { 

    this.options = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + this.session.get_cookie("token")
      })
    }

    this.credit_history$ = new BehaviorSubject<Response>({
      Status : false,
      Messague : "",
      Data : []
    })

    this.debtor$ =  new BehaviorSubject<Debtor>({
      id_debtors: 0,
      names_: "",
      lastnames: ""
    })

  }

  load_history(){

    this.http.get<Response>(this.conf.base_url+"debtorscredits_credit_history/", this.options)
      .subscribe((response : Response)=>{
        
        this.credit_history = response
        this.credit_history$.next(this.credit_history)
      }) 

  }
  get_credits_history() : Observable<Response>
  {
      return this.credit_history$.asObservable();
  }

  filter_history(data : any)  {

      this.http.post<Response>(this.conf.base_url + "debtorscredits_filter_history/", data, this.options)
        .subscribe((res : Response)=>{
          console.log(res)
          if(res.Status){
            this.credit_history = res
            this.credit_history$.next(this.credit_history)
            
          }       
        })
     
  }
  
  create_debtor(data : any) : Observable<Response>
  {

    return this.http.post<Response>(this.conf.base_url + "debtors_create", data, this.options)
  }

  update_debtor(data : any) : Observable<Response>
  {

    return this.http.post<Response>(this.conf.base_url + "debtors_update/", data, this.options)
  }

  set_debtor(debtor : Debtor){

    this.debtor = debtor
    this.debtor$.next(this.debtor)

  }

  get_debtor() : Observable<Debtor>{

    return this.debtor$.asObservable()
  }

  pay_off_credit(credit : Credit) : Observable<Response>{

    const data = {
      id: credit.id_debtors_credit,
      date: this.date.now()
    };
    

    return this.http.post<Response>(this.conf.base_url + "debtorscredits_payoff_credit/", data, this.options)
      
  }

  
}
