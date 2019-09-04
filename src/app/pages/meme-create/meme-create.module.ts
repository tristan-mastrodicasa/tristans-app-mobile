import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemeCreatePage } from './meme-create.page';

import { ServicesModule } from '../../services/services.module';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader/dynamic-script-loader.service';

const routes: Routes = [
  {
    path: '',
    component: MemeCreatePage,
  },
];

@NgModule({
  providers: [
    DynamicScriptLoaderService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ServicesModule,
  ],
  declarations: [MemeCreatePage],
})
export class MemeCreatePageModule {}
