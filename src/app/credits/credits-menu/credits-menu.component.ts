import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Credit } from '../interfaces/credit';
import { LoadModalsService } from '../Services/load-modals.service';
import { Response } from 'src/app/interfaces/response';


@Component({
  selector: 'app-credits-menu',
  templateUrl: './credits-menu.component.html',
  styleUrls: ['./credits-menu.component.css']
})
export class CreditsMenuComponent {
  add_class : boolean = false;
  open_filter_modal : boolean = false;
  loader_status! : boolean;
  constructor(private api : ApiService<Credit>, private modals : LoadModalsService){}
  ngOnInit(){
   
    this.modals.set_status_loader(true)
    this.modals.get_loader_status()
          .subscribe((status : boolean) =>{
            this.loader_status = status
          })

  }
  open_table(){
    
    this.add_class = true
  }

  close(data : boolean){

    this.add_class = data
    
  }

  show_pays(){

    
    this.loader_status = false

    setTimeout(()=>{
      this.api.getAllPost("https://fruverapp.onrender.com/api/debtorscredits_pays/")
      this.api.get_all()
      .subscribe((response : Response)=>{

        console.log(response.Messague)

        this.modals.set_status_loader(response.Status)

      })
    }, 500)
    

  }

  open_filter(){
    
    this.modals.open_modal(true)

    this.modals.get_status()
      .subscribe(state =>{
        this.open_filter_modal = state
      })
  }
}



