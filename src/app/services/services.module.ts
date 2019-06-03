import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { LoginPageModule } from '../modals/log-in/log-in.module';

import { BackendApiService } from './backend-api/backend-api.service';
import { GlobalStore } from './state/global.store';
import { ImposterServerService } from './backend-api/imposter-server.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  providers: [
    BackendApiService,
    GlobalStore,
    AuthService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      ImposterServerService, { dataEncapsulation: false, delay: 500, passThruUnknownUrl: true }
    ),
    IonicStorageModule.forRoot(),
    LoginPageModule
  ]
})
export class ServicesModule { }
