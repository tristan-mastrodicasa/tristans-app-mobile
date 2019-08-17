import { Component, Input } from '@angular/core';
import { UserItem } from '../../services/backend-api/response';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {

  @Input() public userItem: UserItem;

  constructor() { }

}
