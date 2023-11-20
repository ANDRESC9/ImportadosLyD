import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(SessionService)
  let status : boolean = false
  const current_cookie = cookie.get_cookie("token")
  if(current_cookie != ""){

    status = true
  }else{
    status = false
  }
  
  return status
};
