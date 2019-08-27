import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader/dynamic-script-loader.service';

import { LogInPage } from './log-in.page';

@NgModule({
  declarations: [
    LogInPage
  ],
  imports: [
    IonicModule,
  ],
  providers: [DynamicScriptLoaderService],
  exports: [
    LogInPage
  ],
  entryComponents: [
    LogInPage
  ]
})
export class LoginPageModule { }
