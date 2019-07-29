import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.page.html',
  styleUrls: ['./media-upload.page.scss'],
})
export class MediaUploadPage {

  private image: string;

  constructor(
    private camera: Camera,
    private file: File,
    private webView: WebView,
    private androidPermissions: AndroidPermissions,
    private platform: Platform
  ) { }

  /**
   * Open the gallery to select a canvas picture
   */
  public selectCanvasPicture() {

    this.platform.ready().then(_ => {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      );
    });

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    console.log(this.image);

    this.camera.getPicture(options).then((imageData) => {

     let filename = imageData.substring(imageData.lastIndexOf('/') + 1);
     let path = imageData.substring(0, imageData.lastIndexOf('/') + 1);

     console.log('Make it?');

     this.file.copyFile(path, filename, this.file.dataDirectory, 'lol.jpg').then(_ => {
       console.log('Yep');
       this.image = this.webView.convertFileSrc(this.file.dataDirectory + 'lol.jpg');
     }).catch((e) => {
       console.log(e);
     });

   });

  }

}
