import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

import { AuthService } from 'services/auth/auth.service';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: 'pages/home/home.module#HomePageModule',
          },
        ],
      },
      {
        path: 'media-upload',
        children: [
          {
            path: '',
            loadChildren: 'pages/media-upload/media-upload.module#MediaUploadPageModule',
          },
        ],
        canActivate: [AuthService],
        data: { type: 'user-experience' },
      },
      {
        path: 'network',
        children: [
          {
            path: '',
            loadChildren: 'pages/network/users/users.module#UsersPageModule',
          },
        ],
        canActivate: [AuthService],
        data: { type: 'user-experience' },
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
