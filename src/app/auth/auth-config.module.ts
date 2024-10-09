import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AuthModule, LogLevel} from 'angular-auth-oidc-client';
import {environment} from '../../environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config:{
        authority: environment.OidcClientSettings.authority,
        redirectUrl: `${window.location.origin}/home`,
        postLogoutRedirectUri: `${window.location.origin}`,
        clientId: environment.OidcClientSettings.client_id,
        scope: environment.OidcClientSettings.scope,
        responseType: 'code',
        silentRenew: environment.OidcClientSettings.silentRenew,
        silentRenewUrl: window.location.origin + '/silent-renew.html',
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: environment.OidcClientSettings.renewTimeBeforeTokenExpiresInSeconds,
        logLevel: LogLevel.None,
      }
    })
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {
}
