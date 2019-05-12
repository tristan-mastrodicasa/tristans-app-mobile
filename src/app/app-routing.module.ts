import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'followers', loadChildren: './network/followers/followers.module#FollowersPageModule' },
  { path: 'following', loadChildren: './network/following/following.module#FollowingPageModule' },
  { path: 'find-users', loadChildren: './network/find-users/find-users.module#FindUsersPageModule' },
  { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'media-upload', loadChildren: './media-upload/media-upload.module#MediaUploadPageModule' },
  { path: 'meme-focus', loadChildren: './meme-focus/meme-focus.module#MemeFocusPageModule' },
  { path: 'profile', loadChildren: './edit/profile/profile.module#ProfilePageModule' },
  { path: 'account', loadChildren: './edit/account/account.module#AccountPageModule' },
  { path: 'meme-canvas-index', loadChildren: './meme-canvas-index/meme-canvas-index.module#MemeCanvasIndexPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
