import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PrimaryHeaderComponent } from './interface/primary-header/primary-header.component';
import { SidemenuComponent } from './interface/sidemenu/sidemenu.component';

@NgModule({
  imports: [IonicModule, RouterModule],
  declarations: [PrimaryHeaderComponent, SidemenuComponent],
  exports: [PrimaryHeaderComponent, SidemenuComponent]
})
export class ComponentsModule { }
