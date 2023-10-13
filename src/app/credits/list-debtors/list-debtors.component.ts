import { Component } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { Debtor } from '../interfaces/debtor';
import { ApiService } from 'src/app/services/api.service';
import { Delete_response } from 'src/app/interfaces/delete_response';

@Component({
  selector: 'app-list-debtors',
  templateUrl: './list-debtors.component.html',
  styleUrls: ['./list-debtors.component.css']
})
export class ListDebtorsComponent {

  open_edit_form : boolean = false;
  debtors! : Debtor[]
  delete_params! : Delete_response
  constructor(private api : ApiService<Debtor>){

  }

  ngOnInit(){

    this.api.load_debtors()
    this.api.get_debtors()
      .subscribe((debtors : Debtor[])=>{

        this.debtors = debtors
      })
  }
  edit_debtor(){


    
  }

  delete_debtor(id : any){

    this.delete_params = {id : id, table : "debtors", column : "id_debtors"}

    this.api.delete(this.delete_params)
      .subscribe((response : Response) =>{

        console.log(response.Messague)
        if(response.Status){

          this.api.load_debtors()
        }
      })
  }
}
