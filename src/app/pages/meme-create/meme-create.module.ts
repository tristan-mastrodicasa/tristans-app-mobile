import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemeCreatePage } from './meme-create.page';

import { ServicesModule } from 'services/services.module';
import { SharedModule } from 'shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MemeCreatePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ServicesModule,
    SharedModule,
  ],
  declarations: [MemeCreatePage],
})
export class MemeCreatePageModule {}
