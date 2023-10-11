import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Credit } from '../interfaces/credit';
import { LoadModalsService } from '../Services/load-modals.service';


@Component({
  selector: 'app-credits-menu',
  templateUrl: './credits-menu.component.html',
  styleUrls: ['./credits-menu.component.css']
})
export class CreditsMenuComponent {
  add_class : boolean = false;
  open_filter_modal : boolean = false;

  constructor(private api : ApiService<Credit>, private modals : LoadModalsService){}
  ngOnInit(){
   
  }
  open_table(){
    
    this.add_class = true
  }

  close(data : boolean){

    this.add_class = data
    
  }

  show_pays(){

    
  }

  open_filter(){
    
    this.modals.open_modal(true)

    this.modals.get_status()
      .subscribe(state =>{
        this.open_filter_modal = state
      })
  }
}



