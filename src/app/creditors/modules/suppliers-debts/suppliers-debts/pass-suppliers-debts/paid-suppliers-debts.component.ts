import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AbcComponentService } from 'src/app/ABC/abc-component.service';
import { Supplier_debts } from 'src/app/creditors/interfaces/suppliers_debts';
import { Api_Service } from 'src/app/creditors/services/api.service';
import { ModalService } from 'src/app/creditors/services/modal.service';
import { Response } from 'src/app/interfaces/response';
import { TransformDataService } from 'src/app/services/transform-data.service';
@Component({
  selector: 'app-paid-suppliers-debts',
  templateUrl: './paid-suppliers-debts.component.html',
  styleUrls: ['./paid-suppliers-debts.component.css']
})
export class PaidSuppliersDebtsComponent extends AbcComponentService<Supplier_debts> {

  form_paid_off_debts! : FormGroup
  pass_error : boolean = false
  subscription! : Subscription
  suppliers_debts! : Supplier_debts[] 

  constructor(private builder : FormBuilder,
    private api : Api_Service<Supplier_debts>,
    private modal_service : ModalService,
    private transform : TransformDataService
      
      ){
    super(api)
    this.form_paid_off_debts = this.builder.group({
      id_deuda : ["", [Validators.required]],
      value : ["",[Validators.required]],
      date : ["",[Validators.required]],
      pass : ["",[Validators.required, Validators.pattern('^[0-9]*$')]],
      name_supplier : ["",[Validators.required]],
      balance : ["",[Validators.required]],

    })
  }

  ngOnInit(){

   this.subscription =  this.get_details()
      .subscribe((sup : Supplier_debts[])=>{
        console.log(sup)
        sup.forEach((sup_)=>{
          this.form_paid_off_debts.patchValue({
            id_deuda : sup_.id_suppliers_debts,
            date : sup_.date_debts,
            name_supplier : sup_.name_supplier,
            value : sup_.value_,
            pass : sup_.pass,
            balance : sup_.balance,
          })
        })
      })

  }
  send(){

    if(!this.pass_error){

      delete this.form_paid_off_debts.value.name_supplier
      delete this.form_paid_off_debts.value.balance

      this.create_or_update("suppliers_debts_pass", this.form_paid_off_debts)
        .then((res : Response)=>{
          
          if(res.Status){
            this.close_form()
            this.reload_list("suppliersdebts/")
          }
        },(error : Response)=>{console.error(error.Messague)})
    }else{

      this.form_paid_off_debts.markAllAsTouched()
    }
    


  }

  validate_pass(pass : any){

    const current_balance = this.transform.money_to_number(this.form_paid_off_debts.value.balance)
    const pass_in = this.transform.money_to_number(pass)

    if(current_balance < pass_in){

      this.pass_error = true
    }
    else{

      this.pass_error = false
    }

  }

  close_form(){

    this.modal_service.open_modal("modal_pass_suppliers_debts", false)
    this.form_paid_off_debts.reset()
  }

  ngOnDestroy(){
    
    this.subscription.unsubscribe()
    this.form_paid_off_debts.reset()
  }
}
