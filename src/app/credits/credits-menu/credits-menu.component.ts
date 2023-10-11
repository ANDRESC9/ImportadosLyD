import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Credit } from '../interfaces/credit';


@Component({
  selector: 'app-credits-menu',
  templateUrl: './credits-menu.component.html',
  styleUrls: ['./credits-menu.component.css']
})
export class CreditsMenuComponent {
  add_class : boolean = false;

  constructor(private api : ApiService<Credit>){}
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
}



