import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatNumberDirective } from './format-number/format-number.directive';
import { FormatUtcDirective } from './format-utc/format-utc.directive';

@NgModule({
  declarations: [FormatNumberDirective, FormatUtcDirective],
  imports: [
    CommonModule,
  ],
  exports: [FormatNumberDirective, FormatUtcDirective],
})
export class DirectivesModule { }
