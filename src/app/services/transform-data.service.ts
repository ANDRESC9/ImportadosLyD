import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransformDataService {

  constructor() { }


  money_to_number(data_money : number) : number{

    const balanceAsString = data_money.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    const balance = parseFloat(balanceAsString.replace(/[^0-9.-]+/g, ''))


    return balance
  }

  create_dict(){}
}
