import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public oidc: OidcSecurityService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    if (navigator.onLine) {
      this.router.navigateByUrl("home");
    }}

  login(){
    if (navigator.onLine) {
      // User is online, use OIDC for authentication
      this.oidc.authorize();
    } else {
      // User is offline, attempt to use a locally stored token
      this.handleOfflineLogin();
    }
  }

  private handleOfflineLogin() {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      // Validate the local token and handle logic for offline access
      let localToken = window.localStorage.getItem("token");
      if(!localToken){
        this.logout("Es necesario estar conectado e iniciar sesión para continuar.");
      }
      else{
        let tokenData = JSON.parse(atob(localToken.split(".")[1]))
        let today = new Date();
        let expirationTime = new Date(tokenData["exp"]*1000);
        if(today>expirationTime){
          this.logout("Es necesario estar conectado y volver a iniciar sesión para continuar.");
        }
        else{
          this.router.navigateByUrl("/home");
        }
      }
    } else {
      // No local token available, redirect to an error page or prompt
        this.logout("Hemos encontrado un error autenticando el usuario. Es necesario estar conectado para poder continuar con el proceso.");
    }
  }

  private logout(message: string){
    window.localStorage.removeItem("token");
    alert(message)
    this.oidc.logoff().subscribe((result:any) => console.log(result));
  }

  version(){
    return environment.version;
  }
}
