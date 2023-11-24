import { Injectable } from '@angular/core';
import { Api_Service } from '../creditors/services/api.service';
import { FormGroup } from '@angular/forms';
import { Response } from '../interfaces/response';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { inject } from '@angular/core';
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
  public open_paid_filter_modal : boolean = false 
  public details! : model

  // Inventory modals state
  public open_create_product_modal : boolean = false
  public open_edit_product_modal : boolean = false
  public open_filter_product_modal : boolean = false
  private response! : Response
  public alert = inject(AlertService)
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

    if(window.confirm("¿Estás seguro de que desea eliminar este registro?")){
      
      this.api_.delete(delete_params)
        .subscribe((response : Response) =>{
  
          console.log(response.Messague)
          if(response.Status){
  
            this.api_.load_all(url_reload)
            this.alert.set_alert({
              message : "Registro eliminado correctamente.",
              status : true,
              class : "alert-success"
            })
          }else{

            this.alert.set_alert({
              message : "Error al eliminar registro.",
              status : true,
              class : "alert-danger"
            })

          }
        })
    }
   
  }


  create_or_update(options : {url: string; form? : FormGroup; data_dict? : any[]}): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      if(options.data_dict && options.data_dict.length > 0){
        this.api_.update(options.url, options.data_dict).subscribe(
          (res: Response) => {
            if (res.Status) {
              resolve(res);
  
              this.alert.set_alert({
                message : "Registro creado correctamente.",
                status : true,
                class: "alert-success"
              })
            }else{
              this.alert.set_alert(
                {message:"Error: Se a presentado un error al momento de guardar el inventario actual.",
                 status : true,
                 class:"alert-danger"
                })
            }
          },
          (error: any) => {
            console.error('Error al actualizar:', error);
            reject(false);
          }
        );
      }
      if(options.form && options.form!.valid){

        this.api_.update(options.url, options.form!.value).subscribe(
          (res: Response) => {
            if (res.Status) {
              resolve(res);
  
              this.alert.set_alert({
                message : "Registro creado correctamente.",
                status : true,
                class: "alert-success"
              })
            }
          },
          (error: any) => {
            console.error('Error al actualizar:', error);
            reject(false);
          }
        );
      }else{

        this.alert.set_alert(
          {message:"Advertencia: Campos ingresados no cumplen los requisitos, por favor valide nuevamente.",
           status : true,
           class:"alert-warning"
          })
        reject({Messague : "Error en formulario" , status: false, data : []})  
      }
    });
  }

  set_details(id : number, column_name : string ){

    this.api_.get_details(id, column_name)
  }

  get_details() : Observable<model[]>{

    return this.api_.get_details$()
  }


  reload_list(url : string){

    this.api_.load_all(url)
    this.api_.load_all(url, "selects")
  }

  send_data_with_object(options : {url: string; object: {}}) : Promise<Response>{

    return new Promise<Response>((resolve, reject)=>{

      if(options.object){

        this.api_.create(options.url, options.object)
          .subscribe((res : Response)=>{
            if(res.Status){
              resolve(res)
            }else{

              reject(res)
            }
          })
      }
    })
    
  }

      
  }


 


