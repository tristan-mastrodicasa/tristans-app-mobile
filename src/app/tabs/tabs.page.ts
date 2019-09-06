import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { GlobalStore } from '../state/global.store';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  constructor(
    private camera: Camera,
    private globalStore: GlobalStore,
  ) { }

  /**
   * Open the camera functionality to take a canvas picture
   */
  public takeCanvasPicture() {

    this.globalStore.hasToken.then((hasToken) => {

      if (hasToken) {

        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.CAMERA,
        };

        this.camera.getPicture(options).then(
          (imageData) => {
            this.globalStore.setCanvasPicture(imageData);
             // console.log(this.globalStore.hasPictureBeenTaken);
          },
          (err) => {
            console.log(err);
          },
        );

      }

    });

  }

}
