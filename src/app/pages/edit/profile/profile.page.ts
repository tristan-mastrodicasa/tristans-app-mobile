import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Crop } from '@ionic-native/crop/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(
    private camera: Camera,
    private filePath: FilePath,
    private crop: Crop,
  ) { }

  /**
   * Select a new profile picture
   */
  public selectProfileImage() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.camera.getPicture(options).then((imageData) => {

      console.log(imageData);

      this.filePath.resolveNativePath(imageData).then((path) => {
        this.crop.crop(path, { quality: 100, targetWidth: -1, targetHeight: -1 }).then(
          newImage => console.log(`new image path is: ${newImage}`), /** @todo upload image, throw toast */
          error => console.error('Error cropping image', error),
        );
      });

    });

  }
}
