import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CanvasFocusPage } from './canvas-focus.page';

import { ComponentsModule } from '../../components/components.module';
import { ServicesModule } from '../../services/services.module';

const routes: Routes = [
  {
    path: '',
    component: CanvasFocusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ServicesModule
  ],
  declarations: [CanvasFocusPage]
})
export class CanvasFocusPageModule {}
