import { Component } from '@angular/core';
import { Credit_history } from 'src/app/credits/interfaces/Credit_history';
import { Response } from 'src/app/interfaces/response';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-credits-history',
  templateUrl: './credits-history.component.html',
  styleUrls: ['./credits-history.component.css']
})
export class CreditsHistoryComponent {

  credit_history! : Credit_history[]
  constructor(private api : ApiService<Credit_history>){

  }

  ngOnInit(){

    this.api.getAllPost("debtorscredits_credit_history/")

    this.api.get_all()
      .subscribe((response : Response)=>{
        this.credit_history = response.Data
      })
  }
}
