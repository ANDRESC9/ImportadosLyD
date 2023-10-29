import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-paid-suppliers-debts',
  templateUrl: './paid-suppliers-debts.component.html',
  styleUrls: ['./paid-suppliers-debts.component.css']
})
export class PaidSuppliersDebtsComponent {

  form_paid_off_debts! : FormGroup
  pass_error! : boolean 
  constructor(private builder : FormBuilder){

    this.form_paid_off_debts = this.builder.group({
      id_deuda : [],
      date : [],
      name_supplier : [],
      value : [],
      pass : [],
      balance : [],

    })
  }

  send(){}

  validate_pass(balance : any){}

  close_form(){}
}
