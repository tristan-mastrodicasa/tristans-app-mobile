import { Component, Input } from '@angular/core';
import { IUser } from 'core/models';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {

  @Input() public userItem: Partial<IUser>;
  @Input() public itemType: 'default' | 'search' = 'default';

  public following = false;

  constructor() { }

  /**
   * Quick Follow
   * @param event Event object
   */
  public follow(event: any): boolean {

    /** @todo send follow request */

    event.stopPropagation();
    event.preventDefault();
    this.following = true;

    return false;
  }

  /**
   * Unfollow
   * @param event Event object
   */
  public unfollow(event: any): boolean {

    /** @todo send unfollow request */

    event.stopPropagation();
    event.preventDefault();
    this.following = false;

    return false;
  }

}
