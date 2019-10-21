import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { BackendApiService } from 'core/services/backend-api.service';
import { LoadingService } from 'core/services/loading.service';
import { GlobalStore } from 'state/global.store';
import { environment } from 'environments/environment';

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
    private loadingService: LoadingService,
    private globalStore: GlobalStore,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    private router: Router,
  ) { }

  /**
   * Close the login options modal
   */
  public closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Login with facebook oauth
   */
  public signInWithFB() {

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res) => {
      this.http.facebookLogIn(res.authResponse.accessToken).toPromise().then(
        res => this.loginSuccessful(res),
        err => this.loginFailed(err),
      );
    })
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
        this.loadingService.presentLoading().then(() => {

          this.http.googleLogIn(res.serverAuthCode).toPromise().then(
            res => this.loginSuccessful(res),
            err => this.loginFailed(err),
          );
        });

      },
    ).catch(_ => this.loadingService.presentError('There was an issue reaching Google'));

  }

  /**
   * Run this function on sign in success
   * @param  authRes Object containing the token for sign in
   */
  private loginSuccessful(authRes: { token: string }) {
    // Update client state with Jwt //
    console.log(authRes.token);
    this.globalStore.setToken(authRes.token);
    this.router.navigate(['/edit/profile']);
    this.loadingService.closeLoading();
  }

  /**
   * Run this function on sign in failure
   * @param  err Error object
   */
  private loginFailed(err: any) {
    console.log(err);
    this.loadingService.closeLoading();
    this.loadingService.presentError(err.message);
  }

}
