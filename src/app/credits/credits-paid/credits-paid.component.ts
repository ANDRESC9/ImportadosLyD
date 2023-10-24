import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Credit } from '../interfaces/credit';
import { Response } from 'src/app/interfaces/response';
import { LoadModalsService } from '../Services/load-modals.service';

@Component({
  selector: 'app-credits-paid',
  templateUrl: './credits-paid.component.html',
  styleUrls: ['./credits-paid.component.css']
})
export class CreditsPaidComponent {

  credits_paid! : Credit[]
  open_filter_paid : boolean = false
  current_page : number =  1;
  total_size : number = 7

  constructor(private api : ApiService<Credit>, private modals : LoadModalsService){

  }

  ngOnInit(){

    this.api.getAllPost("debtorscredits_pays/")
    this.api.get_all()
      .subscribe((response : Response) =>{
        console.log(response)
        this.credits_paid = response.Data
      })
  }


  open_modal_filter(){

    this.modals.set_modal_filter_Status_paid(true)
    this.modals.get_modal_filter_Status_paid()
      .subscribe((status : boolean)=>{
        this.open_filter_paid = status
      })
  }

  pageChanged(event : any) {
    this.current_page = event;
  }
}
