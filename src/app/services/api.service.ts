import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Response } from '../interfaces/response';
import { Debtor } from '../credits/interfaces/debtor';
import { Credit } from '../credits/interfaces/credit';
import { ApiConfigService } from './api-config.service';

//Inyecta dependencias de la raíz
@Injectable({
  providedIn: 'root'
})

export class ApiService<T> {

  private records!: Response;
  private suject$!: BehaviorSubject<Response>

  private debtors!: Debtor[];
  private debtors_suject$!: BehaviorSubject<Debtor[]>

  private info_credit! : Credit;
  private info_Credit$!: BehaviorSubject<Credit>

  constructor(protected http : HttpClient, private conf : ApiConfigService) {


    this.suject$ = new BehaviorSubject<Response>({
      Status : false,
      Messague : "",
      Data : []
    })

    this.debtors_suject$ = new BehaviorSubject<Debtor[]>([])
    this.info_Credit$ = new BehaviorSubject<Credit>({
      id_debtors_credit: 0,
      debtors_fk: 0,
      value_: 0,
      date_debts: new Date(),
      names_: 'string',
      lastnames: 'string',
      pass: 0,
      balance: 0,
      date_last_pass : new Date(),
      date_paid_off : new Date()
    });
   }

  getAllPost(url : string) {

    this.http.get<Response>(this.conf.base_url+url)
    .subscribe((response : Response)=>{

      this.records = response
      this.suject$.next(this.records)
    })
    
  }
  load_info_credit(credit : Credit){

    this.info_credit = credit
    this.info_Credit$.next(this.info_credit)

  }

  get_info_credit(): Observable<Credit>{

    return this.info_Credit$.asObservable()
  }

  load_debtors(){

    this.http.get<Response>(this.conf.base_url + "debtors/")
    .subscribe((response : Response)=>{

      this.debtors = response.Data
      this.debtors_suject$.next(this.debtors)
    })
  }

  get_debtors(){
    return this.debtors_suject$.asObservable();
  }

  get_all(): Observable<Response>{
    
    return this.suject$.asObservable();
  }

  create(url : string, server : any) {

    return this.http.post<Response>(url, server)
    
  }

  delete(params : any) : Observable<Response>{

    return this.http.post<Response>(this.conf.base_url + "records/delete_soft", params);
  }

}
