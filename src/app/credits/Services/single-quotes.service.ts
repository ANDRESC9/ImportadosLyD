import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingleQuotesService {

  constructor() { 

  }

  single_quotes_to_data(data : any){

    const new_data = data.map((element : any) => "'" + element + "'")
    return new_data
  }
}
