import { Component } from '@angular/core';
import { Credit } from '../interfaces/credit';
import { ApiService } from 'src/app/services/api.service';
import { Response } from 'src/app/interfaces/response';
import { LoadModalsService } from '../Services/load-modals.service';

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

  constructor(private api : ApiService<Credit>, private modals : LoadModalsService){
  
  }

  ngOnInit(){
    
    this.api.getAllPost("debtorscredits/")
    this.api.get_all()
      .subscribe((data: Response) =>{
        
        this.credits = data.Data
        this.is_load = data.Status
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

  ngOnDestroy(){

    this.credits = []
  }
}

