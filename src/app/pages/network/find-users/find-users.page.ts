import { Component } from '@angular/core';

import { BackendApiService } from 'core/services';
import { IUserItem } from 'core/models';

@Component({
  selector: 'app-find-users',
  templateUrl: './find-users.page.html',
  styleUrls: ['./find-users.page.scss'],
})
export class FindUsersPage {

  public userItemList: IUserItem[];
  public page = 1;
  public results = 20;

  private initialResultsShown = false;

  constructor(private http: BackendApiService) { }

  /**
   * Show recommended users
   */
  public ionViewDidEnter() {
    if (!this.initialResultsShown) {
      this.http.searchUsers('').toPromise().then((res) => {
        this.userItemList = res;
        this.initialResultsShown = true;
      }).catch(err => console.log(err));
    }
  }

  /**
   * Search the database for users with the provided string
   * @todo Add a 404 heads up in prod
   */
  public search(event: any) {
    this.http.searchUsers(event.target.value).toPromise().then((res) => {
      this.page = 1;
      this.userItemList = res;
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

  /**
   * When you change your query, clear the results section
   */
  public clearResults() {
    this.userItemList = [];
  }

}
