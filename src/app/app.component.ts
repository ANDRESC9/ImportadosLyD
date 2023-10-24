import { Component } from '@angular/core';

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

  constructor() {
    this.anchoPantalla = window.innerWidth;
  }

  toggleClase() {
    this.claseActiva = !this.claseActiva; 
    this.hiddenMenu = !this.hiddenMenu;
    this.widthContent = !this.widthContent;
  }
}
