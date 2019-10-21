import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { LoginPageModule } from 'modals/log-in/log-in.module';
import {
  BackendApiService,
  ImposterServerService,
  AuthService,
  HelpersService,
  LoadingService,
  DynamicScriptLoaderService,
} from './services';

import { environment } from 'environments/environment';

@NgModule({
  providers: [
    BackendApiService,
    AuthService,
    HelpersService,
    LoadingService,
    DynamicScriptLoaderService,
    FileTransfer,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    (environment.includeCache ? HttpClientInMemoryWebApiModule.forRoot(
      ImposterServerService, { dataEncapsulation: false, delay: 900, passThruUnknownUrl: true },
    ) : []),
    IonicStorageModule.forRoot(),
    LoginPageModule,
  ],
})
export class CoreModule { }
