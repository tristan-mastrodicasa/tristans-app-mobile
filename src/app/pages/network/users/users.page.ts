import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { BackendApiService } from '../../../services/backend-api/backend-api.service';
import { UserItem } from '../../../services/backend-api/response';
import { GlobalStore } from '../../../state/global.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {

  private myUserItem: UserItem;
  private segment: string;

  private userItemList = [] as UserItem[];
  private itemsPerRequest = 6;
  private page = 1;

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore
  ) { }

  /**
   * Upon Segment Change, populate the view with the networked users
   * @param  e Segment event (with details about which segment is chosen)
   */
  public segmentChanged(e: any) {

    let segment = e.detail.value;
    this.segment = segment;

    // Reset the infinite scroll variables //
    this.page = 1;
    this.userItemList = [];

    // Refresh the user profile information //
    this.http.getUserItemById('5cf330860ffe101b48a0fcc4').pipe(first()).subscribe((res) => {
      this.myUserItem = res;
    });

    console.log(e.detail.value);

    // Send an http request //
    this.http.getNetworkUserItems(segment, '5cf330860ffe101b48a0fcc4', this.itemsPerRequest, this.page).pipe(first()).subscribe((res) => {

      // So that if the user swaps segments fast the list will not populate unless //
      // the current segment (this.segment) is the same as the segment requested (segment) //
      if (segment === this.segment) this.userItemList = res;
      console.log(this.userItemList);

    });

  }

  /** @todo Add the load on scroll feature */

}
