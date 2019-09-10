import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page'; //tslint:disable-line

import { ComponentsModule } from 'components/components.module';
import { ServicesModule } from 'services/services.module';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
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
  ],
  declarations: [AccountPage],
})
export class AccountPageModule {}
