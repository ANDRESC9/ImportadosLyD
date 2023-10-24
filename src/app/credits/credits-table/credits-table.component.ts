import { Component } from '@angular/core';
import { Credit } from '../interfaces/credit';
import { ApiService } from 'src/app/services/api.service';
import { Response } from 'src/app/interfaces/response';
import { LoadModalsService } from '../Services/load-modals.service';
import { DebtorsService } from '../Services/debtors.service';
import { TransformDataService } from 'src/app/services/transform-data.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-credits-table',
  templateUrl: './credits-table.component.html',
  styleUrls: ['./credits-table.component.css']
})

export class CreditsTableComponent {
  is_load : boolean = true
  credits! : Array<Credit>
  credit_! :Credit
  add_class : boolean = false
  open_filter_modal : boolean = false
  currentPage : number = 1 
  itemsPerPage : number = 7
  
  constructor(private api : ApiService<Credit>, 
    private modals : LoadModalsService, 
    private debtors_service : DebtorsService,
    private transform_data : TransformDataService,
    private loader : LoaderService
    ){
  
  }

  ngOnInit(){
    this.loader.set_loader_status(true)

    this.api.getAllPost("debtorscredits/")
    this.api.get_all()
      .subscribe((data: Response) =>{
        
        this.credits = data.Data

        if(data.Status){
          this.loader.set_loader_status(false)
        }
        
      })


      this.is_load = false
  }

  pass(credit_table : Credit){
    this.add_class = true
    this.api.load_info_credit(credit_table)
    
  }

  close_children(event : any){

    this.add_class = event;
  }

  open_filter(){
    
    this.modals.open_modal(true)

    this.modals.get_status()
      .subscribe(state =>{
        this.open_filter_modal = state
      })
  }

  pay_off(credit : Credit){


    const balance = this.transform_data.money_to_number(credit.balance)
    
    if(balance > 0 ){

      if(window.confirm("El credito tiene un saldo actual de "+ credit.balance+". ¿Esta seguro de saldar esta deuda?")){

        this.debtors_service.pay_off_credit(credit)
          .subscribe((res : Response)=>{
            if(res.Status){

              console.log(res)
              this.api.getAllPost("debtorscredits/")
            }
          })
      }
      
    }
  }
  pageChanged(event : any) {
    this.currentPage = event;
  }

  ngOnDestroy(){

    this.credits = []
  }
}

