import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Response } from '../interfaces/response';
import { Debtor } from '../credits/interfaces/debtor';
import { Credit } from '../credits/interfaces/credit';
import { ApiConfigService } from './api-config.service';
import { Token } from '@angular/compiler';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

//Inyecta dependencias de la raíz
@Injectable({
  providedIn: 'root'
})

export class ApiService <Model> {

  private records!: Response;
  public suject$!: BehaviorSubject<Response>

  private debtors!: Debtor[];
  private debtors_suject$!: BehaviorSubject<Debtor[]>

  private info_credit! : Credit;
  private info_Credit$!: BehaviorSubject<Credit>

  private model_filter! : Response
  private model_filter$!: BehaviorSubject<Response>
  private options: { headers: HttpHeaders } = {
    headers: new HttpHeaders()
  };

  constructor(protected http : HttpClient, private conf : ApiConfigService, private session : SessionService) {

     this.options = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + this.session.get_cookie("token")
      })
    };
    
    this.model_filter$ = new BehaviorSubject<Response>({
      Status : false,
      Messague : "",
      Data : []
    })

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


    this.http.get<Response>(this.conf.base_url+url,this.options)
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

  load_debtors(action : string){

    this.http.get<Response>(this.conf.base_url + action, this.options)
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

    return this.http.post<Response>(url, server, this.options)
    
  }

  delete(params : any) : Observable<Response>{

    return this.http.post<Response>(this.conf.base_url + "records/delete_soft", params, this.options);
  }


  //observable para filtrar modelos

  load_filter_model(url : string){

    this.http.get<Response>(this.conf.base_url + url, this.options)
      .subscribe((res : Response)=>{
        this.model_filter = res
        this.model_filter$.next(this.model_filter)
      })
  }

  get_model_filter$() : Observable<Response>{

    return this.model_filter$.asObservable()
  }

  //filtro tabla creditos

  set_filter_credits_table(data: any, filter_url : string ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<Response>(this.conf.base_url + filter_url, data, this.options)
        .subscribe((res: Response) => {
          console.log(res)
          if (res.Status) {
            this.records = res;
            this.suject$.next(this.records);
            resolve(true);
          } else {
            resolve(false);
          }
        }, error => {
          reject(error);
        });
    });
  }

  set_filter_debtors(data: string) :Promise<boolean>{

    return new Promise<boolean>((resolve, reject) =>{
      this.http.post<Response>(this.conf.base_url + "debtors_filter/", data, this.options)
        .subscribe((response : Response)=>{
          if(response.Status){
            this.debtors = response.Data
            this.debtors_suject$.next(this.debtors)
            resolve(true)
          }else{

            resolve(false)
          }
        })
    })
  }
}
