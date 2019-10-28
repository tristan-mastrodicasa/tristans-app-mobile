import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) { }

  /**
   * Open the camera functionality to take a canvas picture
   */
  public takeCanvasPicture() {
    this.globalStore.hasToken.then((hasToken) => {
      if (hasToken) {

        const options: CameraOptions = {
          ...canvasImageConfig,
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

  /**
   * Reload and scroll to the top of the home feed if the current
   * page is the home page
   */
  public scrollToTop() {
    if (this.router.url === '/app/home') this.globalStore.setHomeRefreshTrigger(true);
  }

}
