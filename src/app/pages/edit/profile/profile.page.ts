import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Crop } from '@ionic-native/crop/ngx';

import { BackendApiService, LoadingService } from 'core/services';
import { IProfile } from 'core/models';
import { GlobalStore } from 'state/global.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: IProfile;

  constructor(
    private http: BackendApiService,
    private loading: LoadingService,
    private store: GlobalStore,
    private router: Router,
    private camera: Camera,
    private filePath: FilePath,
    private crop: Crop,
  ) { }

  /**
   * Get user profile to edit
   */
  public async ngOnInit() {
    this.user = await this.http.getUserItemById(this.store.state.userId).toPromise();
  }

  /**
   * Save the new profile data
   */
  public async saveProfile() {

    let error = false;

    await this.http.editUserProfile(
      this.store.state.userId,
      { username: this.user.username, firstName: this.user.firstName },
    ).toPromise().catch((err) => {
      console.log(err);
      this.loading.presentError(err.error.errors[0].detail);
      error = true;
    });

    if (!error) this.router.navigate(['profile', this.store.state.userId], { queryParams: { refresh: new Date().getTime() } });
  }

  /**
   * Select a new profile picture
   */
  public async selectProfileImage() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    const imageData = await this.camera.getPicture(options);

    const filepath = await this.filePath.resolveNativePath(imageData);
    const croppedImage = await this.crop.crop(filepath, { quality: 100, targetWidth: -1, targetHeight: -1 });

    const res = await this.http.uploadNewUserImage(this.store.state.userId, croppedImage);
    if (res[0]) this.loading.presentError(res[0].detail);
  }
}
