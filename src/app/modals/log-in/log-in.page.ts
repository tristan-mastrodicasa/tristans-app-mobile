import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { environment } from '../../../environments/environment';
import { GlobalStore } from '../../state/global.store';
import { Token } from '../../models/response.interfaces';

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
    private googlePlus: GooglePlus,
    private fb: Facebook,
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
      message,
      header: 'Error',
      buttons: ['Dismiss'],
    });

    await alert.present();
  }

  /**
   * Present the loading screen
   */
  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();
  }

  /**
   * Login with facebook oauth
   */
  public signInWithFB() {

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log(res))
    .catch(e => console.log('Error logging into Facebook', e));

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

  }

  /**
   * Login with google OAuth2.0
   */
  public signInWithGoogle() {

    // Launch the google api //
    this.googlePlus.login({ scope: 'profile email picture', webClientId: environment.google_client_id, offline: true }).then(
      (res) => {
        console.log(res.serverAuthCode);

        // Send the authtoken to the backend to confirm and collect jwt //
        this.presentLoading();
        this.http.googleLogIn(res.serverAuthCode).toPromise().then(

          // Login successful //
          (authRes: Token) => {

            // Update client state with Jwt //
            console.log(authRes.token);
            this.globalStore.setToken(authRes.token);
            this.loadingController.dismiss();

          },

          // Login failed //
          (err) => {
            this.loadingController.dismiss();
            this.presentError(err.message);
          });

      },
    ).catch(_ => this.presentError('There was an issue reaching Google'));

  }

}
