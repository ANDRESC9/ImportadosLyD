import { Component } from '@angular/core';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Supplier } from 'src/app/creditors/interfaces/supplier';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-create-suppliers',
  templateUrl: './create-suppliers.component.html',
  styleUrls: ['./create-suppliers.component.css']
})
export class CreateSuppliersComponent extends AbcComponentService<Supplier>
{

  form_supplier! : FormGroup
  constructor(private api : Api_Service<Supplier>,
    private builder : FormBuilder,
    private modal_service : ModalService,
    private router : Router,

      ){
    super(api)

    this.form_supplier = this.builder.group({

      names : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })


  }


  send(){
    
    // if(this.form_supplier.valid){
      this.create_or_update({url:"suppliers_create", form:this.form_supplier})
      .then((res : Response)=>{
        if(res.Status){
          this.reload_list("suppliers/")
          this.router.navigate(["deudas/provedores/"])
          // this.alert.set_alert({message:"Proovedor creado correctamente.", status : true, class:"alert-success"})
          this.close_form()
        }
      },(res : Response)=>{ 
        console.error(res)
        this.form_supplier.markAllAsTouched()
      }
      ).catch((error)=>{
        console.error("Error al crear proveedor" + error)
      })
 
  }

  close_form(){

    this.modal_service.open_modal("modal_create_suppliers", false)
  }

}
