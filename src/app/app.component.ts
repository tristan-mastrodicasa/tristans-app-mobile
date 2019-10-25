import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private router: Router,
  ) {
    this.initializeApp();
  }

  /**
   * Complete normal initilization
   */
  public initializeApp() {

    // Initialze App //
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();

      this.oneSignal.startInit('156f6e8c-0f17-445f-9cc8-43f7b6f38074', '839993677318');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe((notification) => {
        // console.log(notification);
      });

      this.oneSignal.handleNotificationOpened().subscribe((notification) => {
        this.router.navigate([notification.notification.payload.additionalData.page]);
      });

      this.oneSignal.endInit();

    });

  }

}
