import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider} from "angularx-social-login";

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { GlobalStore } from '../../services/state/global.store';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

  private loading: boolean = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private http: BackendApiService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private globalStore: GlobalStore
  ) { }

  closeModal() {
    this.modalController.dismiss();
  }

  async presentError(message) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Dismiss']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
  }

  signInWithFB() {

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      this.presentLoading();

      this.http.logIn(user.authToken).pipe(first()).subscribe((res) => {

        if(res.error.exists) {

            this.http.signUp(user.authToken).pipe(first()).subscribe((res) => {

              this.loadingController.dismiss();
              if(res.error.exists) this.presentError('There was an issue with your access token');
              else {

                this.http.logIn(user.authToken).pipe(first()).subscribe((res) => {
                  this.globalStore.logIn(res.content.jwt_token);
                });

              }

            });

        } else {

          this.globalStore.logIn(res.content.jwt_token);
          this.loadingController.dismiss();

        }

      });
    });
  }

}
