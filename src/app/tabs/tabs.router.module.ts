import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
            loadChildren: '../pages/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'meme-canvas-index',
        children: [
          {
            path: '',
            loadChildren: '../pages/meme-canvas-index/meme-canvas-index.module#MemeCanvasIndexPageModule'
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      }
    ]
  },
  {
     path: '',
     redirectTo: '/app/home',
     pathMatch: 'full'
   }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
