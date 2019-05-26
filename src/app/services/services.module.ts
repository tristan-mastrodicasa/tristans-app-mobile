import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { BackendApiService } from './backend-api/backend-api.service';
import { GlobalStore } from './state/global.store';
import { ImposterServerService } from './backend-api/imposter-server.service';

@NgModule({
  providers: [
    BackendApiService,
    GlobalStore
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      ImposterServerService, { dataEncapsulation: false, delay: 500, passThruUnknownUrl: true }
    ),
    IonicStorageModule.forRoot()
  ]
})
export class ServicesModule { }
