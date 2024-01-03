import { Component } from '@angular/core';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Product } from 'src/app/inventory/interfaces/Product';
import { ModalInventoryService } from 'src/app/inventory/Services/modal-inventory.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent extends AbcComponentService<Product> {

  form_product! : FormGroup
  constructor(private api : Api_Service<Product>,
    private builder : FormBuilder,
    private modal_service : ModalInventoryService,
    private router : Router,

      ){
    super(api)

    this.form_product = this.builder.group({

      names : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      trays : ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      box_value : ["", [Validators.required, Validators.pattern('^[0-9]*$')]]
    })


  }


  send(){
    
    // if(this.form_product.valid){
      this.create_or_update({url:"products_create", form: this.form_product})
      .then((res : Response)=>{
        if(res.Status){
          this.reload_list("products/")
          this.router.navigate(["inventario/productos"])
          // this.alert.set_alert({message:"Proovedor creado correctamente.", status : true, class:"alert-success"})
          this.close_form()
        }
      },(res : Response)=>{ 
        console.error(res)
        this.form_product.markAllAsTouched()
      }
      ).catch((error)=>{
        console.error("Error al crear producto" + error)
      })
 
  }

  close_form(){

    this.modal_service.open_modal("modal_create_product", false)
    this.form_product.reset()
  }


}
