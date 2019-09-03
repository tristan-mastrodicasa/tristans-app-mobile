import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { environment } from '../../../environments/environment';
import { GlobalStore } from '../../state/global.store';
import { Token } from '../../services/backend-api/response.interface';

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
    private fb: Facebook
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

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log(res))
    .catch(e => console.log('Error logging into Facebook', e));


    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

  }

  /**
   * Login with google OAuth2.0
   */
  public signInWithGoogle() {

    this.googlePlus.login({ scope: 'profile email picture', webClientId: environment.google_client_id, offline: true })
    .then(res => {
      console.log(res.serverAuthCode);

      this.presentLoading();
      this.http.googleLogIn(res.serverAuthCode).toPromise().then((authRes: Token) => {

        console.log(authRes.token);
        this.globalStore.setToken(authRes.token);
        this.loadingController.dismiss();

      });

    })
    .catch(err => console.error(err));

  }

}
