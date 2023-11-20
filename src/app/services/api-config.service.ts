import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  base_url : string = "http://127.0.0.1:8000/api/"
  constructor() { 
  }

}
