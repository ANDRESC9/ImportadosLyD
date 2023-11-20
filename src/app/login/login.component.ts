import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Response } from '../interfaces/response';
import { ApiConfigService } from '../services/api-config.service';
import { Token } from '../interfaces/Token';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form_login! : FormGroup
  invalid_login : boolean = false

  constructor(private http : HttpClient,
    private builder : FormBuilder,
    private conf : ApiConfigService,
    private auth : AuthService,
    private router : Router,
    private cookies : SessionService,
    private alert : AlertService
     ){

    this.form_login = this.builder.group({
      username : ["", [Validators.required]],
      password : ["", [Validators.required]]
    })

  }


  login(){

    if(this.form_login.valid){
      
      this.http.post<Token>(this.conf.base_url + "get_token/", this.form_login.value)
        .subscribe((token : Token)=>{
          console.log(token)
            if(token){
              
              this.cookies.set_cookie("token", token.token)
              // this.auth.current_token = token
              this.auth.set_login_status(true)
              this.router.navigate(["main"])
              this.alert.set_alert({message : "Inicio de sesión realizado correctamente.", status : true, class : "alert-info"})

            }
        },(error : HttpErrorResponse)=>{

          if(error.status === 400){
            this.invalid_login = true
            this.auth.set_login_status(false)
            this.cookies.set_cookie("token", " ")
          }
          else{
            alert("Error al intentar conectar con el servidor, por favor contacte con soporte")
          }
        })
    }
    else{

      this.form_login.markAllAsTouched()
    }
    
  }
}
