import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { GlobalStore } from 'state/global.store';
import { canvasImageConfig } from 'configs/canvas-image.config';

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
          quality: canvasImageConfig.quality,
          destinationType: this.camera.DestinationType[canvasImageConfig.destinationType],
          encodingType: this.camera.EncodingType[canvasImageConfig.encodingType],
          mediaType: this.camera.MediaType[canvasImageConfig.mediaType],
          sourceType: this.camera.PictureSourceType.CAMERA,
          targetHeight: canvasImageConfig.targetHeight,
          targetWidth: canvasImageConfig.targetWidth,
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
