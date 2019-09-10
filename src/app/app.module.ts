import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component'; //tslint:disable-line
import { AppRoutingModule } from './app-routing.module'; //tslint:disable-line

import { GlobalStore } from './state/global.store'; //tslint:disable-line
import { ComponentsModule } from './components/components.module'; //tslint:disable-line
import { ServicesModule } from './services/services.module'; //tslint:disable-line

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    ServicesModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GlobalStore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
