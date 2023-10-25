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
  constructor(private loader : LoaderService) {
    this.anchoPantalla = window.innerWidth;
  }

  ngOnInit(){


  }
  toggleClase() {
    this.claseActiva = !this.claseActiva; 
    this.hiddenMenu = !this.hiddenMenu;
    this.widthContent = !this.widthContent;
  }
}
