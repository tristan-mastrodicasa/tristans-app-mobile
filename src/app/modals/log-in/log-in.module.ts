import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { LogInPage } from './log-in.page';

import { FacebookLoginProvider, SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';


let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('323465568348747')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    LogInPage
  ],
  imports: [
    IonicModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  exports: [
    LogInPage
  ],
  entryComponents: [
    LogInPage
  ]
})
export class LoginPageModule { }
