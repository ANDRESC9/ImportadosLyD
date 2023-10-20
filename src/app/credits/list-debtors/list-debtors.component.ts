import { Component } from '@angular/core'; 
import { Response } from 'src/app/interfaces/response';
import { Debtor } from '../interfaces/debtor';
import { ApiService } from 'src/app/services/api.service';
import { Delete_response } from 'src/app/interfaces/delete_response';
import { LoadModalsService } from '../Services/load-modals.service';
import { DebtorsService } from '../Services/debtors.service';

@Component({
  selector: 'app-list-debtors',
  templateUrl: './list-debtors.component.html',
  styleUrls: ['./list-debtors.component.css']
})
export class ListDebtorsComponent {

  open : boolean = false;
  debtors! : Debtor[]
  delete_params! : Delete_response
  open_filter : boolean = false;

  constructor(private api : ApiService<Debtor>, 
    private modal : LoadModalsService,
    private debtors_service : DebtorsService
    ){

  }

  ngOnInit(){

    this.api.load_debtors("debtors/")
    this.api.get_debtors()
      .subscribe((debtors : Debtor[])=>{

        this.debtors = debtors
      })
  }
 
  delete_debtor(id : any){

    this.delete_params = {id : id, table : "debtors", column : "id_debtors"}

    this.api.delete(this.delete_params)
      .subscribe((response : Response) =>{

        console.log(response.Messague)
        if(response.Status){

          this.api.load_debtors("debtors/")
        }
      })
  }

  open_modal_edit_debtor(id : any){

    this.debtors_service.set_debtor(id)
    this.modal.set_form_edit_debtors_status(true)
    
    this.modal.get_status_form_edit_debtors()
      .subscribe((status : boolean)=>{

        this.open = status
      })
  
  }

  open_filter_debtor(){

    this.modal.set_modal_filter_Status_debtor(true)

    this.modal.get_modal_filter_Status_debtor()
      .subscribe((status : boolean)=>{

        this.open_filter = status
      })
  }
}
