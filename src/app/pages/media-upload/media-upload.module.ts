import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


import { IonicModule } from '@ionic/angular';

import { MediaUploadPage } from './media-upload.page';

import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MediaUploadPage
  }
];

@NgModule({
  providers: [
    AndroidPermissions,
    Camera,
    File,
    WebView
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [MediaUploadPage]
})
export class MediaUploadPageModule {}
