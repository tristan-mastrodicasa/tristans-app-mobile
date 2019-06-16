import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { GlobalStore } from './state/global.store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private globalStore: GlobalStore
  ) {
    this.initializeApp();
  }

  /**
   * Complete normal initilization
   * Check if the user is logged in, complete work with the JWT
   */
  public initializeApp() {

    // Initialze App //
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // Load Profile //
    // Subscribe to the state //
    // Might remove this later, Talk to Tristan //
    this.globalStore.state$.subscribe(state => {
      if (state.initialized) {

        if (!state.userInitialized) {
          // Verify JWT works (if any) //
          // If no JWT -> check if logged into fb //
          this.globalStore.userInitialized();
        }

      }
    });


  }

}
