import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
    private browser: InAppBrowser,
    private ngZone: NgZone,
  ) {
    this.initializeApp();
  }

  /**
   * Complete normal initilization
   */
  public initializeApp() {

    // Initialze App //
    this.platform.ready().then(() => {

      // Splash screen stuff //
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();

      // Notification stuff //
      this.oneSignal.startInit('156f6e8c-0f17-445f-9cc8-43f7b6f38074', '839993677318');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationOpened().subscribe((notification) => {
        this.router.navigate([notification.notification.payload.additionalData.page]);
      });

      this.oneSignal.endInit();

      // Open certain urls stuff //
      // Have to do some hacking to get past ionics specialness //
      const intentHandler = intent => this.ngZone.run(() => {
        if (intent.data) {
          const urlParts: string[] = intent.data.split('?')[0].split('/');
          if (urlParts[urlParts.length - 2] === 'canvas') {
            this.router.navigate([`canvas/${urlParts[urlParts.length - 1]}`]);
          } else {
            this.browser.create(intent.data);
          }
        }
      });

      (window as any).plugins.intentShim.onIntent(intentHandler);
      (window as any).plugins.intentShim.getIntent(intentHandler, () => null);

    });

  }

}
