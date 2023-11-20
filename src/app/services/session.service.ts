import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookie : CookieService) { }

  set_cookie(name_cookie : string, values : any){
    
    this.cookie.set(name_cookie, values)
  }

  get_cookie(name_cookie : string){


    return this.cookie.get(name_cookie)
  }

}

  