import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatNumberDirective } from './format-number/format-number.directive'; // tslint:disable-line
import { FormatUtcDirective } from './format-utc/format-utc.directive'; // tslint:disable-line

@NgModule({
  declarations: [FormatNumberDirective, FormatUtcDirective],
  imports: [
    CommonModule,
  ],
  exports: [FormatNumberDirective, FormatUtcDirective],
})
export class DirectivesModule { }
