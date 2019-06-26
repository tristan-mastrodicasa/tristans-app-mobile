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

  private segment = 'follow-back';

  private userProfile: UserItem;

  private followBacks = {
    recentCanvas: [] as UserItem[],
    userList: [] as UserItem[]
  };

  private following = {
    recentCanvas: [] as UserItem[],
    userList: [] as UserItem[]
  };

  private followers = {
    recentCanvas: [] as UserItem[],
    userList: [] as UserItem[]
  };

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore
  ) { }

  /**
   * Upon Segment Change, populate the view with the networked users
   * @param  e Segment event (with details about which segment is chosen)
   */
  public segmentChanged(e: any) {
    console.log(e.detail.value);

    // Establish which segment we are populating, set the right objects and http requests //
    let userItemObject;
    let backendService;

    switch (e.detail.value) {
      case 'follow-back':
        userItemObject = 'followBacks';
        backendService = 'getFollowBacks';
        break;
      case 'following':
        userItemObject = 'following';
        backendService = 'getFollowing';
        break;
      case 'followers':
        userItemObject = 'followers';
        backendService = 'getFollowers';
        break;
    }

    // Send an http request //
    this.http[backendService](this.globalStore.state.user_data._id).pipe(first()).subscribe((res) => {

      this[userItemObject].userList = [];
      this[userItemObject].recentCanvas = [];

      for (let i = 0; i < res.content.length; i++) {

        // The first element in all requests is the updated user object //
        if (i === 0) {
          this.userProfile = res.content[i];
          continue;
        }

        // Choose which object is populated, the active canvas list or normal user list //
        if (res.content[i].activeCanvases !== undefined) this[userItemObject].recentCanvas.push(res.content[i]);
        else this[userItemObject].userList.push(res.content[i]);

        // Logs, testing only //
        console.log(userItemObject);
        console.log(backendService);
        console.log(this[userItemObject]);

      }

    });

  }

}
