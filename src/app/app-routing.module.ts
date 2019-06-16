import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'meme-focus', loadChildren: './pages/meme-focus/meme-focus.module#MemeFocusPageModule' },
  { path: 'profile/:id', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthService], data: { type: 'user-experience' } },
  { path: 'network/find-users', loadChildren: './pages/network/find-users/find-users.module#FindUsersPageModule', canActivate: [AuthService], data: { type: 'user-experience' } },
  { path: 'edit/profile', loadChildren: './pages/edit/profile/profile.module#ProfilePageModule', canActivate: [AuthService], data: { type: 'user-experience' } },
  { path: 'edit/account', loadChildren: './pages/edit/account/account.module#AccountPageModule', canActivate: [AuthService], data: { type: 'user-experience' } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
