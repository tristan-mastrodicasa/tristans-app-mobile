import { Component, Input } from '@angular/core';
import { IUserItem } from 'core/models';
import { BackendApiService } from 'core/services';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {

  @Input() public userItem: IUserItem;
  @Input() public itemType: 'default' | 'search' = 'default';

  public following = false;

  constructor(private http: BackendApiService) { }

  /**
   * Quick Follow
   * @param event Event object
   */
  public follow(event: any): boolean {

    event.stopPropagation();
    event.preventDefault();
    this.following = true;

    this.http.follow(this.userItem.id).toPromise().then(_ => null);

    return false;
  }

  /**
   * Unfollow
   * @param event Event object
   */
  public unfollow(event: any): boolean {

    event.stopPropagation();
    event.preventDefault();
    this.following = false;

    this.http.unfollow(this.userItem.id).toPromise().then(_ => null);

    return false;
  }

}
