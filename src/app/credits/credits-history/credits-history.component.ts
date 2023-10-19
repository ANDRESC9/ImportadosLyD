import { Component } from '@angular/core';
import { Credit_history } from 'src/app/credits/interfaces/Credit_history';
import { Response } from 'src/app/interfaces/response';
import { DebtorsService } from '../Services/debtors.service';
import { ApiService } from 'src/app/services/api.service';
import { LoadModalsService } from '../Services/load-modals.service';

@Component({
  selector: 'app-credits-history',
  templateUrl: './credits-history.component.html',
  styleUrls: ['./credits-history.component.css']
})
export class CreditsHistoryComponent {

  pageSize = 7; // Número de elementos por página
  currentPage = 1; // Página actual
  open_filter : boolean = false
  credit_history! : Credit_history[]

  constructor(protected deb : DebtorsService, private  api: ApiService<Credit_history>, private modal_Service : LoadModalsService){

  }

  ngOnInit(){

    this.deb.load_history()

    this.deb.get_credits_history()
      .subscribe((res : Response)=>{
        this.credit_history = res.Data
        
      })
    
  }

  pageChanged(event : any) {
    this.currentPage = event;
  }

  open_filter_history(){

    this.modal_Service.set_modal_filter_Status(true)
    
    this.modal_Service.get_modal_filter_Status()
      .subscribe((status : boolean) =>{

        this.open_filter = status
      })
  }
}
