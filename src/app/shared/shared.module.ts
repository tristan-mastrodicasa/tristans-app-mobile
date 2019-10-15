import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { FormatNumberDirective } from './directives/format-number/format-number.directive';
import { FormatUtcDirective } from './directives/format-utc/format-utc.directive';

import { PrimaryHeaderComponent } from './components/interface/primary-header/primary-header.component';
import { BackButtonComponent } from './components/interface/back-button/back-button.component';

import { ContentCardComponent } from './components/content-card/content-card.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { MemeGeneratorComponent } from './components/meme-generator/meme-generator.component';

import { DynamicScriptLoaderService } from './services/dynamic-script-loader.service';

@NgModule({
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
  ],
  declarations: [
    FormatNumberDirective,
    FormatUtcDirective,
    PrimaryHeaderComponent,
    BackButtonComponent,
    ContentCardComponent,
    UserItemComponent,
    MemeGeneratorComponent,
  ],
  exports: [
    FormatNumberDirective,
    FormatUtcDirective,
    PrimaryHeaderComponent,
    BackButtonComponent,
    ContentCardComponent,
    UserItemComponent,
    MemeGeneratorComponent,
  ],
})
export class SharedModule {

  /**
   * Method to define providers when importing into the root module
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DynamicScriptLoaderService],
    };
  }
}
