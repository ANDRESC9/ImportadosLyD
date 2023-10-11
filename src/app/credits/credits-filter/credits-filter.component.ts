import { Component } from '@angular/core';
import { LoadModalsService } from '../Services/load-modals.service';
@Component({
  selector: 'app-credits-filter',
  templateUrl: './credits-filter.component.html',
  styleUrls: ['./credits-filter.component.css']
})
export class CreditsFilterComponent {

  constructor(private modal : LoadModalsService){

  }


  close_modal_filter(){

    this.modal.open_modal(false);
  }
}
