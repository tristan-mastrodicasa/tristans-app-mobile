import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'core/core.module';
import { File } from '@ionic-native/file/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { FormatNumberDirective } from './directives/format-number/format-number.directive';
import { FormatUtcDirective } from './directives/format-utc/format-utc.directive';

import {
  ContentCardComponent,
  UserItemComponent,
  MemeGeneratorComponent,
  BackButtonComponent,
} from './components';

@NgModule({
  providers: [File, Clipboard],
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    CoreModule,
  ],
  declarations: [
    FormatNumberDirective,
    FormatUtcDirective,
    ContentCardComponent,
    UserItemComponent,
    MemeGeneratorComponent,
    BackButtonComponent,
  ],
  exports: [
    FormatNumberDirective,
    FormatUtcDirective,
    ContentCardComponent,
    UserItemComponent,
    MemeGeneratorComponent,
    BackButtonComponent,
  ],
})
export class SharedModule { }
