import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Supplier } from 'src/app/creditors/interfaces/supplier';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Response } from 'src/app/interfaces/response';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent extends AbcComponentService<Supplier> {
  form_supplier_edit! : FormGroup


  constructor(private builder : FormBuilder,
     private api : Api_Service<Supplier>,
     private modal_services : ModalService
     ){
    super(api)

    this.form_supplier_edit = this.builder.group({
      id : [""],
      names : [""]

    })

  }

  ngOnInit(){
    console.log("asdasd")
    this.api.get_details$()
      .subscribe((sup : Supplier[])=>{
        sup.forEach((sup_ : Supplier)=>{
          this.form_supplier_edit.patchValue({
            id : sup_.id_suppliers,
            names : sup_.name_supplier
           }) 
        })
        
       })

  }

  send(){
    
    if(this.form_supplier_edit.valid){

      this.create_or_update("suppliers_update", this.form_supplier_edit.value)
        .then((res : Response)=>{
          if(res.Status){
            this.reload_list("suppliers/")
            // this.alert.set_alert(
            //   {
            //     message : "Proovedor '"+ this.form_supplier_edit.value.names + "' actualizado correctamente.",
            //     status : true,
            //     class : "alert-success" 
            //   })
            this.close_form()
          }else{
            this.form_supplier_edit.markAllAsTouched()
          }
        },(res : Response)=>{console.error(res.Messague)})
        .catch((error)=>{
          console.error("Error al actualizar proveedor" + error)
        })


    }else{

      this.form_supplier_edit.markAllAsTouched()
    }
    
  }

  close_form(){

    this.modal_services.open_modal("modal_edit_suppliers", false);
    this.form_supplier_edit.reset()
  }

 
}
