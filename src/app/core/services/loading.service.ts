import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  /**
   * Present an error message
   * @param message Message to display
   */
  public async presentError(message: string) {
    const alert = await this.alertController.create({
      message,
      header: 'Error',
      buttons: ['Dismiss'],
    });

    await alert.present();
  }

  /**
   * Present the loading screen
   * @todo add a timeout for failure
   */
  public async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();
  }

  /**
   * Close loading indicator
   */
  public closeLoading() {
    this.loadingController.dismiss();
  }

}
