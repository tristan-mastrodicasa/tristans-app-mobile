import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-header',
  templateUrl: './primary-header.component.html',
  styleUrls: ['./primary-header.component.scss'],
})
export class PrimaryHeaderComponent {

  @Input() pageTitle: string;

  constructor() { }

}
