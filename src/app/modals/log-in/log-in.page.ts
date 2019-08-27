import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';
declare var gapi: any;
declare var FB: any;

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { environment } from '../../../environments/environment';
import { GlobalStore } from '../../state/global.store';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader/dynamic-script-loader.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

  public loading = false;

  constructor(
    private modalController: ModalController,
    private http: BackendApiService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private globalStore: GlobalStore,
    private scriptLoader: DynamicScriptLoaderService,
  ) { }

  /**
   * Close the login options modal
   */
  public closeModal() {
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
   * Login with facebook oauth
   */
  public signInWithFB() {

    this.scriptLoader.load('fb').then(() => {

      FB.init({ appId: environment.facebook_client_id, version: environment.facebook_sdk_version });
      FB.login((response) => {
          if (response.authResponse) {
           console.log(response);
           /*FB.api('/me', (response) => {
             console.log('Good to see you, ' + response.name + '.');
           });*/

           // Post the auth/facebook/redirect with the access code to generate profile / login and recieve cookie
           /** @todo Consider renaming the auth/facebook/redirect route */

          } else {
           console.log('User cancelled login or did not fully authorize.');
          }
      });

    });

  }

  /**
   * Login with google OAuth2.0
   */
  public signInWithGoogle() {

    this.scriptLoader.load('gapi').then(() => {

      gapi.load('auth2', () => {

        gapi.auth2.init({
          client_id: environment.google_client_id
        }).then(googleAuth => {

          googleAuth.signIn({
            scope: 'profile email'
          }).then(googleUser => {
            // Post the auth/google/redirect with the access code to generate profile / login and recieve cookie
            /** @todo Consider renaming the auth/google/redirect route */
          });

        });

      });

    });

  }

}
