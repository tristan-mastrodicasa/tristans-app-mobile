import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsersPage } from './users.page';

import { ComponentsModule } from 'shared/components/components.module';
import { ServicesModule } from 'services/services.module';

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
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
  declarations: [UsersPage],
})
export class UsersPageModule {}
