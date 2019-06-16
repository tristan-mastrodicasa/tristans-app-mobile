import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PrimaryHeaderComponent } from './interface/primary-header/primary-header.component';
import { BackButtonComponent } from './interface/back-button/back-button.component';

import { ContentCardComponent } from './content-card/content-card.component';
import { UserItemComponent } from './user-item/user-item.component';

@NgModule({
  imports: [IonicModule, RouterModule],
  declarations: [
    PrimaryHeaderComponent,
    BackButtonComponent,
    ContentCardComponent,
    UserItemComponent
  ],
  exports: [
    PrimaryHeaderComponent,
    BackButtonComponent,
    ContentCardComponent,
    UserItemComponent
  ]
})
export class ComponentsModule { }
