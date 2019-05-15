import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'log-in', loadChildren: './pages/log-in/log-in.module#LogInPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'network/find-users', loadChildren: './pages/network/find-users/find-users.module#FindUsersPageModule' },
  { path: 'network/followers', loadChildren: './pages/network/followers/followers.module#FollowersPageModule' },
  { path: 'network/following', loadChildren: './pages/network/following/following.module#FollowingPageModule' },
  { path: 'meme-focus', loadChildren: './pages/meme-focus/meme-focus.module#MemeFocusPageModule' },
  { path: 'edit/profile', loadChildren: './pages/edit/profile/profile.module#ProfilePageModule' },
  { path: 'edit/account', loadChildren: './pages/edit/account/account.module#AccountPageModule' },
  { path: 'media-upload', loadChildren: './pages/media-upload/media-upload.module#MediaUploadPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
