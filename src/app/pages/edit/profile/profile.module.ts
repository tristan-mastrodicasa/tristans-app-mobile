import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Crop } from '@ionic-native/crop/ngx';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';

import { ComponentsModule } from 'components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
];

@NgModule({
  providers: [
    Camera,
    FilePath,
    Crop,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
