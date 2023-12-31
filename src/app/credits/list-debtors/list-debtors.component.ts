import { Component } from '@angular/core'; 
import { Response } from 'src/app/interfaces/response';
import { Debtor } from '../interfaces/debtor';
import { ApiService } from 'src/app/services/api.service';
import { Delete_response } from 'src/app/interfaces/delete_response';
import { LoadModalsService } from '../Services/load-modals.service';
import { DebtorsService } from '../Services/debtors.service';
import { LoaderService } from 'src/app/services/loader.service';

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
  currentPage : number = 1 
  total_size : number = 7

  constructor(private api : ApiService<Debtor>, 
    private modal : LoadModalsService,
    private debtors_service : DebtorsService,
    private loader : LoaderService
    ){

  }

  ngOnInit(){

    this.loader.set_loader_status(true)
    this.api.load_debtors("debtors/")
    this.api.get_debtors()
      .subscribe((debtors : Debtor[])=>{

        this.debtors = debtors
        this.loader.set_loader_status(false)
      })
  }
 
  delete_debtor(id : any){

    if(window.confirm("¿Estás seguro de que deseas eliminar a este deudor?")){
      
      this.delete_params = {id : id, table : "debtors", column : "id_debtors"}
      this.api.delete(this.delete_params)
        .subscribe((response : Response) =>{
  
          console.log(response.Messague)
          if(response.Status){
  
            this.api.load_debtors("debtors/")
          }
        })
    }
   
  }
  pageChanged(event : any) {
    this.currentPage = event;
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
