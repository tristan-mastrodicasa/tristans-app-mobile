import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FindUsersPage } from './find-users.page';

import { SharedModule } from 'shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: FindUsersPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [FindUsersPage],
})
export class FindUsersPageModule {}
