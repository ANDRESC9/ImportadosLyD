import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServicesService {

  date = new Date()
  constructor() { 


  }

  now() : string{

    var year = this.date.getFullYear()
    var month = this.date.getMonth() + 1
    var day = this.date.getDate()
    var hour = this.date.toLocaleTimeString()

    var full_date = year +"-"+(month< 10 ? "0": "")+ month+"-"+ (day< 10 ? "0": "")+day+ " " + hour

    return full_date
  }

  Date() : string{

    var year = this.date.getFullYear()
    var month = this.date.getMonth() + 1
    var day = this.date.getDate()

    var full_date = year +"-"+(month< 10 ? "0": "")+ month+"-"+ (day< 10 ? "0": "")+day
    return full_date
  }
}
