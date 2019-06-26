import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFormatNumber]'
})
export class FormatNumberDirective {

  constructor(private el: ElementRef) { }

  @Input('appFormatNumber')
  public set number(number: number) {
    this.el.nativeElement.innerHTML = this.formatNumber(number, 1);
  }

  /**
   * Change a number in javascript to a prettier human readable version
   * Code used from stack overflow -> https://stackoverflow.com/a/9462382/3867288
   * @param  num    The number
   * @param  digits How many digits after the decimal place
   * @return        String; 1210 => '1.2K' (if digits == 1)
   */
  public formatNumber(num: number, digits: number) {

    let si = [
      { value: 1, symbol: '' },
      { value: 1E3, symbol: 'k' },
      { value: 1E6, symbol: 'M' },
      { value: 1E9, symbol: 'G' },
      { value: 1E12, symbol: 'T' },
      { value: 1E15, symbol: 'P' },
      { value: 1E18, symbol: 'E' }
    ];

    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;

    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }

    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;

  }

}
