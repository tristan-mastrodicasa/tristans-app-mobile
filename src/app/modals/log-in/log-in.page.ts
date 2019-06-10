import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { AuthService, FacebookLoginProvider } from 'angularx-social-login';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { GlobalStore } from '../../services/state/global.store';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

  private loading = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private http: BackendApiService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private globalStore: GlobalStore
  ) { }

  /**
   * Close the login options modal
   */
  private closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Present the error message should something go wrong with the login process
   * @param message Message to display
   */
  private async presentError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['Dismiss']
    });

    await alert.present();
  }

  /**
   * Present the loading screen
   */
  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
  }

  /**
   * Function initiates the FB login sequence and subsequently updates the login state of the
   * application (client side). Currently the angularx-social-login module is used as a placeholder
   * until we are able to implement the native cordova plugin when we test compiled native apps
   */
  private signInWithFB() {

    // Here we use the placeholder login module to start the process //
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {

      // Present the loading dialog //
      this.presentLoading();

      // When the user logs into facebok try logging in with their auth token //
      this.http.logIn(user.authToken).pipe(first()).subscribe((res1) => {

        // If an error with the res1 auth token exists, try creating a profile with it //
        if (res1.error.exists) {

            this.http.signUp(user.authToken).pipe(first()).subscribe((res2) => {

              if (res2.error.exists) this.presentError('There was an issue with your access token');
              else {

                // If the signup was successful try logging in again //
                this.http.logIn(user.authToken).pipe(first()).subscribe((res3) => {
                  this.globalStore.logIn(res3.content.jwtToken);
                });

              }

              this.loadingController.dismiss();

            });

        } else {

          // If the res1 auth token logs the user in update the state //
          this.globalStore.logIn(res1.content.jwtToken);
          this.loadingController.dismiss();

        }

      });

    });

  }

}
