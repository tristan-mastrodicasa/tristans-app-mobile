import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFormatUtc]',
})
export class FormatUtcDirective {

  constructor(private el: ElementRef) { }

  @Input('appFormatUtc')
  public set utc(utc: number) {
    this.el.nativeElement.innerHTML = this.timeDifference(Date.now(), utc);
  }

  /**
   * Return the human readable difference in time between two utc timestamps
   * Code from -> https://stackoverflow.com/a/6109105/3867288
   * @param  current  Start utc time (now)
   * @param  previous Last utc time (utc in the past)
   * @return          A string describing the time passed in human readable format
   */
  public timeDifference(current: number, previous: number): string {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return 'Just Now';
    }  if (elapsed < msPerHour) {
      return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    }  if (elapsed < msPerDay) {
      return `${Math.round(elapsed / msPerHour)} hours ago`;
    }  if (elapsed < msPerMonth) {
      return `${Math.round(elapsed / msPerDay)} days ago`;
    }  if (elapsed < msPerYear) {
      return `${Math.round(elapsed / msPerMonth)} months ago`;
    }

    return `${Math.round(elapsed / msPerYear)} years ago`;

  }

}
