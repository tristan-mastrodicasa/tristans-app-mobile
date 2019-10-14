import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Router } from '@angular/router';

import { GlobalStore } from 'state/global.store';
import { BackendApiService } from 'services/backend-api/backend-api.service';
import { LoadingService } from 'services/loading/loading.service';

import { canvasImageConfig } from 'configs/canvas-image.config';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.page.html',
  styleUrls: ['./media-upload.page.scss'],
})
export class MediaUploadPage implements OnInit {

  public webImagePath: string;
  public localImagePath: string;
  public description: string;

  public customActionSheetOptions: any = {
    header: 'Visibility',
  };

  constructor(
    private camera: Camera,
    private webView: WebView,
    private filePath: FilePath,
    private globalStore: GlobalStore,
    private http: BackendApiService,
    private loadingService: LoadingService,
    private router: Router,
  ) { }

  /**
   * Check if the camera has taken a picture from the tab button
   */
  public ngOnInit() {

    this.globalStore.state$.subscribe((state) => {
      if (state.stagedCanvasPicture != null) {
        this.displayImagePreview(state.stagedCanvasPicture);
        this.globalStore.resetCanvasPicture();
      }
    });

  }

  /**
   * Open the gallery to select a canvas picture
   */
  public selectCanvasPicture() {

    const options: CameraOptions = {
      quality: canvasImageConfig.quality,
      destinationType: this.camera.DestinationType[canvasImageConfig.destinationType],
      encodingType: this.camera.EncodingType[canvasImageConfig.encodingType],
      mediaType: this.camera.MediaType[canvasImageConfig.mediaType],
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetHeight: canvasImageConfig.targetHeight,
      targetWidth: canvasImageConfig.targetWidth,
    };

    this.camera.getPicture(options).then((imageData) => {

      this.globalStore.setCanvasPicture(imageData);
      this.displayImagePreview(imageData);

    });

  }

  /**
   * Display the image in the media-upload view
   * @param  contentURI The content uri of the image on the device
   */
  public displayImagePreview(contentURI: string) {

    this.localImagePath = contentURI;

    this.filePath.resolveNativePath(contentURI).then((path) => {
      this.webImagePath = this.webView.convertFileSrc(path);
    }).catch((e) => {
      console.log(e);
    });

  }

  /**
   * Upload the content, redirect to page hosting the image
   */
  public confirmUpload() {

    if (this.localImagePath != null) {
      console.log('here');

      this.loadingService.presentLoading().then((_) => {

        this.http.uploadCanvas(this.localImagePath, this.description).then(
          (res) => {
            this.loadingService.closeLoading();

            if (res[0]) {

              this.loadingService.presentError(res[0].detail); /** @todo find a less hackable way to check type */

            } else {

              const canvasInfo = res as { canvasId: number };
              this.router.navigate(['/canvas', canvasInfo.canvasId]);

            }
          },
        );

      });

    }

  }

  /**
   * Cancel the image upload
   */
  public cancelUpload() {
    this.webImagePath = null;
  }

}
