import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { environment } from '../../../environments/environment';
import { GlobalStore } from '../../state/global.store';

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
    private globalStore: GlobalStore
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

  }

  /**
   * Login with google OAuth2.0
   */
  public signInWithGoogle() {


  }

}
