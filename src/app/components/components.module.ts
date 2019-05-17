import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PrimaryHeaderComponent } from './interface/primary-header/primary-header.component';
import { SidemenuComponent } from './interface/sidemenu/sidemenu.component';
import { BackButtonComponent } from './interface/back-button/back-button.component';

@NgModule({
  imports: [IonicModule, RouterModule],
  declarations: [
    PrimaryHeaderComponent,
    SidemenuComponent,
    BackButtonComponent
  ],
  exports: [
    PrimaryHeaderComponent,
    SidemenuComponent,
    BackButtonComponent
  ]
})
export class ComponentsModule { }
