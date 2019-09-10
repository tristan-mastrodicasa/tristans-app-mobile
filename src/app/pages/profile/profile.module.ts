import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page'; //tslint:disable-line

import { ComponentsModule } from 'components/components.module';
import { ServicesModule } from 'services/services.module';
import { DirectivesModule } from 'directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ServicesModule,
    DirectivesModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
