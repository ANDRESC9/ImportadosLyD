import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Credit } from '../interfaces/credit';
import { Response } from 'src/app/interfaces/response';

@Component({
  selector: 'app-credits-paid',
  templateUrl: './credits-paid.component.html',
  styleUrls: ['./credits-paid.component.css']
})
export class CreditsPaidComponent {

  credits_paid! : Credit[]
  constructor(private api : ApiService<Credit>){


  }


  ngOnInit(){

    this.api.getAllPost("debtorscredits_pays/")
    this.api.get_all()
      .subscribe((response : Response) =>{
        console.log(response)
        this.credits_paid = response.Data
      })
  }
}
