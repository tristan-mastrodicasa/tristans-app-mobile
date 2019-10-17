import { Component } from '@angular/core';

import { BackendApiService } from 'core/services';
import { IUserItem } from 'core/models';
import { GlobalStore } from 'state/global.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {

  public myUserItem: IUserItem;
  private segment: 'follow-backs' | 'followers' | 'following';

  public userItemList = [] as IUserItem[];
  public results = 15;
  public page = 1;

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore,
  ) { }

  /**
   * Refresh list on load
   */
  public ionViewDidEnter () {
    /** @todo Implement a lightway method to refresh without so many requests */
    if (this.segment) this.segmentChanged({ detail: { value: this.segment } });
  }

  /**
   * Upon Segment Change, populate the view with the networked users
   * @param e Segment event (with details about which segment is chosen)
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
    this.http.getNetworkUserItems(segment, this.globalStore.state.userId).toPromise().then((res) => {

      // So that if the user swaps segments fast the list will not populate unless //
      // the current segment (this.segment) is the same as the segment requested (segment) //
      if (segment === this.segment) this.userItemList = res;

    }).catch(err => console.log(err));

  }

  /**
   * Show more users while scrolling
   * @param  event Ionic stuff
   */
  public showMoreUsers(event: any) {
    this.page += 1;
    event.target.complete();
  }

  /** @todo Add the pull down reload (in prod) */

}
