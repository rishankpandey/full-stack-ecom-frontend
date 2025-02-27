import { Component, Inject } from '@angular/core';
import myAppConfig  from '../../config/my-app-config';
import { OKTA_AUTH, OktaAuthModule } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';
import {OktaAuth} from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  oktaSignin:any;

  constructor( @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
    logo: 'assets/images/logo.png',
    baseUrl: myAppConfig.oidc.issuer.split('/oaut2')[0],
    clientId: myAppConfig.oidc.clientId,
    redirectUri: myAppConfig.oidc.redirectUri,
    authParams: {
      pkce: true,
      issuer: myAppConfig.oidc.issuer,
      scopes: myAppConfig.oidc.scopes
    }
    });

  }

  ngOnInit() : void{
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el:'#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
    (response: any) => {
      if(response.status === 'SUCCESS'){
        this.oktaAuth.signInWithRedirect();
      }
    },
    (error: any)=>{
      throw error;
    }
  );

  }

}
