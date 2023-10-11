import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  base_url : string = "https://fruverapp.onrender.com/api/"
  constructor() { 
  }

}
