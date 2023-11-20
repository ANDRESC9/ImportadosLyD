import { Component } from '@angular/core';
import { Alert } from 'src/app/interfaces/alert';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  claseActiva: boolean  = true; 
  hiddenMenu : boolean = true;
  widthContent : boolean = true;
  anchoPantalla: number;
  on_login : boolean = false;
  message! : string;
  class_name! : string
  constructor(private alert_service : AlertService) {
    this.anchoPantalla = window.innerWidth;

  }
   ngOnInit(){
    const alert_doom = document.getElementById("alert_")
    this.alert_service.alert$
      .subscribe(async (alert : Alert)=>{
        this.message = alert.message
         
        if(alert.status){
          
          alert_doom?.classList.remove("hidden_alert")
          alert_doom?.classList.add(alert.class)
          alert_doom?.classList.add("show_alert")

         await new Promise(resolve=>{
          setTimeout(() => {
            alert_doom?.classList.remove("show_alert")
            alert_doom?.classList.add("hidden_alert")
            
            setTimeout(() => {
              alert_doom?.classList.remove(alert.class)
            }, 2000);
          }, 4000);
         }) 

          
        }

        
      })
  }

  toggleClase() {
    this.claseActiva = !this.claseActiva; 
    this.hiddenMenu = !this.hiddenMenu;
    this.widthContent = !this.widthContent;
  }


}
