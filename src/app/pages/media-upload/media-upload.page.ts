import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { GlobalStore } from '../../state/global.store';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.page.html',
  styleUrls: ['./media-upload.page.scss'],
})
export class MediaUploadPage implements OnInit {

  private image = 'https://www.roberthompson.co.uk/meme-app/meme.jpg';
  private customActionSheetOptions: any = {
    header: 'Visibility'
  };

  constructor(
    private camera: Camera,
    private webView: WebView,
    private filePath: FilePath,
    private globalStore: GlobalStore
  ) { }

  /**
   * Check if the camera has taken a picture from the tab button
   */
  public ngOnInit() {

    this.globalStore.state$.subscribe(state => {
      if (state.pictureTaken) {
        this.displayImagePreview(state.pictureData);
        this.globalStore.resetPictureTaken();
      }
    });

  }

  /**
   * Open the gallery to select a canvas picture
   */
  public selectCanvasPicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then((imageData) => {

     this.displayImagePreview(imageData);

   });

  }

  /**
   * Display the image in the media-upload view
   * @param  contentURI The content uri of the image on the device
   */
  public displayImagePreview(contentURI: string) {

    this.filePath.resolveNativePath(contentURI).then((path) => {
      this.image = this.webView.convertFileSrc(path);
    }).catch((e) => {
      console.log(e);
    });

  }

}
