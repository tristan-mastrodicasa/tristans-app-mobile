import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';

import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';

import { ServicesModule } from 'services/services.module';

@NgModule({
  providers: [
    Camera,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    ServicesModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
