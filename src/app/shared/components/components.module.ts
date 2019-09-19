import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PrimaryHeaderComponent } from './interface/primary-header/primary-header.component';
import { BackButtonComponent } from './interface/back-button/back-button.component';

import { ContentCardComponent } from './content-card/content-card.component';
import { UserItemComponent } from './user-item/user-item.component';
import { MemeGeneratorComponent } from './meme-generator/meme-generator.component';
import { DirectivesModule } from 'shared/directives/directives.module'; /** @todo wtf is this doing in the parent directory?? */

import { DynamicScriptLoaderService } from 'services/dynamic-script-loader/dynamic-script-loader.service';

@NgModule({
  imports: [
    IonicModule,
    RouterModule,
    DirectivesModule,
    CommonModule,
  ],
  providers: [
    DynamicScriptLoaderService,
  ],
  declarations: [
    PrimaryHeaderComponent,
    BackButtonComponent,
    ContentCardComponent,
    UserItemComponent,
    MemeGeneratorComponent,
  ],
  exports: [
    PrimaryHeaderComponent,
    BackButtonComponent,
    ContentCardComponent,
    UserItemComponent,
    MemeGeneratorComponent,
  ],
})
export class ComponentsModule { }
