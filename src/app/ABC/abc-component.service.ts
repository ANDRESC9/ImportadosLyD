import { Injectable } from '@angular/core';
import { Api_Service } from '../creditors/services/api.service';
import { FormGroup } from '@angular/forms';
import { Supplier } from '../creditors/interfaces/supplier';
import { Response } from '../interfaces/response';
@Injectable({
  providedIn: 'root'
})
export class AbcComponentService<model> {

  public currentPage : number = 1
  public total_size : number =  7
  public open_filter_modal : boolean = false
  public open_edit_modal : boolean = false
  public open_create_modal : boolean = false
  public open_create_supliers_debts_modal : boolean = false
  public open_pass_modal : boolean = false 
  public details! : model
  private response! : Response
  constructor(private api_ : Api_Service<model>) {

  }

  send_data_with_params(url : string, params : {}) : Promise<Response>{

    return new Promise<Response>((resolve, reject)=>{

      this.api_.update(url, params)
        .subscribe((res : Response)=>{
          if(res.Status){

            resolve(res)
          }else{
            reject(res)
          }
        }, (error : any)=>{ console.error("Error al enviar informacion con parametros" + error)})
    })

  }
  send_data_form(form : FormGroup, url : string) : Promise<boolean>{

    if(form.valid){

      return this.api_.filter(url, form.value)
      
    }

    return new Promise<boolean>((reject)=>{reject(false)})
  }

  delete(id : any, url_reload : string, delete_params : {}){

    if(window.confirm("¿Estás seguro de que deseas eliminar a este deudor?")){
      
      this.api_.delete(delete_params)
        .subscribe((response : Response) =>{
  
          console.log(response.Messague)
          if(response.Status){
  
            this.api_.load_all(url_reload)
          }
        })
    }
   
  }


  create_or_update(url: string, data: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.api_.update(url, data).subscribe(
        (res: Response) => {
          console.log(res);
          if (res.Status) {
            resolve(true);
          } else {
            reject(false);
          }
        },
        (error: any) => {
          console.error('Error al actualizar:', error);
          reject(false);
        }
      );
    });
  }



  reload_list(url : string){

    this.api_.load_all(url)
    this.api_.load_all(url, "selects")
  }

      
  }


 


