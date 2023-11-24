import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Response } from 'src/app/interfaces/response';
import { Product } from 'src/app/inventory/interfaces/Product';
import {Subscription} from 'rxjs'
import { ModalInventoryService } from 'src/app/inventory/Services/modal-inventory.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent extends AbcComponentService<Product> {

  form_product_edit! : FormGroup
  subs! : Subscription

  constructor(private builder : FormBuilder,
     private api : Api_Service<Product>,
     private modal_services : ModalInventoryService
     ){
    super(api)

    this.form_product_edit = this.builder.group({
      id : ["" , Validators.required],
      names : ["",Validators.required],
      trays : [""],

    })

  }

  ngOnInit(){

    this.subs = this.api.get_details$()
      .subscribe((pro : Product[])=>{
        pro.forEach((pro_ : Product)=>{
          this.form_product_edit.patchValue({
            id : pro_.id_product,
            names : pro_.product_name,
            trays : pro_.trays_per_box

           }) 
        })
        
       })

  }

  send(){
    
    if(this.form_product_edit.valid){
      console.log(this.form_product_edit.value)
      this.create_or_update({url:"products_update", form: this.form_product_edit})
        .then((res : Response)=>{
          if(res.Status){
            this.reload_list("products/")
            // this.alert.set_alert(
            //   {
            //     message : "Proovedor '"+ this.form_product_edit.value.names + "' actualizado correctamente.",
            //     status : true,
            //     class : "alert-success" 
            //   })
            this.close_form()
          }else{
            this.form_product_edit.markAllAsTouched()
          }
        },(res : Response)=>{console.error(res.Messague)})
        .catch((error)=>{
          console.error("Error al actualizar producto" + error)
        })


    }else{

      this.form_product_edit.markAllAsTouched()
    }
    
  }

  close_form(){

    this.modal_services.open_modal("modal_edit_product", false);
    this.form_product_edit.reset()
  }

  ngOnDestroy(){

    this.subs.unsubscribe()
  }

}
