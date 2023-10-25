import { Component } from '@angular/core';
import { Credit } from '../interfaces/credit';
import { ApiService } from 'src/app/services/api.service';
import { Response } from 'src/app/interfaces/response';
import { LoadModalsService } from '../Services/load-modals.service';
import { DebtorsService } from '../Services/debtors.service';
import { TransformDataService } from 'src/app/services/transform-data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits-table',
  templateUrl: './credits-table.component.html',
  styleUrls: ['./credits-table.component.css']
})

export class CreditsTableComponent {
  loader_status : boolean = true
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
    private loader : LoaderService,
    private router : Router
    ){
  
  }

  ngOnInit(){
    this.loader.set_loader_status(true)

    this.api.getAllPost("debtorscredits/")
    this.api.get_all()
      .subscribe((data: Response) =>{
        
        this.credits = data.Data

        if(data.Status){
          this.loader_status = false
        }
        
        
      })

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

        this.loader.set_loader_status(true)
        this.debtors_service.pay_off_credit(credit)
          .subscribe((res : Response)=>{
            if(res.Status){

              this.api.getAllPost("debtorscredits/")
              this.router.navigate(["creditos/tabla"])
              this.loader.set_loader_status(false)
            }
          })
      }
      
    }
  }
  pageChanged(event : any) {
    this.currentPage = event;
  }

  ngOnDestroy(){


  }
}

