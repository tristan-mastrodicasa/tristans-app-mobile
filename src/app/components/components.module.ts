import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PrimaryHeaderComponent } from './interface/primary-header/primary-header.component'; // tslint:disable-line
import { BackButtonComponent } from './interface/back-button/back-button.component'; // tslint:disable-line

import { ContentCardComponent } from './content-card/content-card.component'; // tslint:disable-line
import { UserItemComponent } from './user-item/user-item.component'; // tslint:disable-line
import { DirectivesModule } from 'directives/directives.module';

@NgModule({
  imports: [
    IonicModule,
    RouterModule,
    DirectivesModule,
    CommonModule,
  ],
  declarations: [
    PrimaryHeaderComponent,
    BackButtonComponent,
    ContentCardComponent,
    UserItemComponent,
  ],
  exports: [
    PrimaryHeaderComponent,
    BackButtonComponent,
    ContentCardComponent,
    UserItemComponent,
  ],
})
export class ComponentsModule { }
