import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'importados_lyd';

  claseActiva: boolean  = true; 
  hiddenMenu : boolean = true;
  widthContent : boolean = true;
  anchoPantalla: number;
  loader_status! : boolean;
  constructor(private loader : LoaderService) {
    this.anchoPantalla = window.innerWidth;
  }

  ngOnInit(){

    this.loader.set_loader_status(false)
    this.loader.get_loader_status()
      .subscribe(status=>{

        this.loader_status = status
      })
  }
  toggleClase() {
    this.claseActiva = !this.claseActiva; 
    this.hiddenMenu = !this.hiddenMenu;
    this.widthContent = !this.widthContent;
  }
}
