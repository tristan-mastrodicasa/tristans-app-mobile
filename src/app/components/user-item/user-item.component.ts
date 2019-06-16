import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {

  @Input() public id = '';
  @Input() public photo = '/assets/svg-img/default-profile-picture.svg';
  @Input() public firstName = '';
  @Input() public username = '';
  @Input() public influence = 0;

  constructor() { }

}
