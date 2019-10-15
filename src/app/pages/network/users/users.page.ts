import { Component } from '@angular/core';

import { BackendApiService } from 'core/services';
import { IUser } from 'core/models';
import { GlobalStore } from 'state/global.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {

  public myUserItem: Partial<IUser>;
  private segment: string;

  private userItemList = [] as Partial<IUser>[];
  private itemsPerRequest = 6;
  private page = 1;

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore,
  ) { }

  /**
   * Upon Segment Change, populate the view with the networked users
   * @param  e Segment event (with details about which segment is chosen)
   */
  public segmentChanged(e: any) {

    const segment = e.detail.value;
    this.segment = segment;

    // Reset the infinite scroll variables //
    this.page = 1;
    this.userItemList = [];

    // Refresh the user profile information //
    console.log(this.globalStore.state.userId);
    this.http.getUserItemById(this.globalStore.state.userId).toPromise().then((res) => {
      this.myUserItem = res;
    });

    console.log(e.detail.value);

    // Send an http request //
    this.http.getNetworkUserItems(segment, 1, this.itemsPerRequest, this.page).toPromise().then((res) => {

      // So that if the user swaps segments fast the list will not populate unless //
      // the current segment (this.segment) is the same as the segment requested (segment) //
      if (segment === this.segment) this.userItemList = res;
      console.log(this.userItemList);

    });

  }

  /** @todo Add the load on scroll feature */

}
