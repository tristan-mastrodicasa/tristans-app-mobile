import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

import { LogInPage } from './log-in.page'; // tslint:disable-line

@NgModule({
  declarations: [
    LogInPage,
  ],
  imports: [
    IonicModule,
  ],
  providers: [GooglePlus, Facebook],
  exports: [
    LogInPage,
  ],
  entryComponents: [
    LogInPage,
  ],
})
export class LoginPageModule { }
