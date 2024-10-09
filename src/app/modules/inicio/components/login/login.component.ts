import {Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  version() {}
  login() {}
 
}
