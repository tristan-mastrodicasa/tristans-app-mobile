import { Component, OnInit } from '@angular/core';

import { BackendApiService } from 'core/services';
import { ContentCard } from 'core/models';
import { GlobalStore } from 'state/global.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public posts: ContentCard[] = [];
  public results = 6;
  public page = 1;

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore,
  ) { }

  /**
   * Handles the inifinite scroll functionality
   */
  public ngOnInit() {
    this.getPosts();
  }

  /**
   * When users scroll near the bottom of the view, build more posts
   * @param  event Event object
   */
  public loadPosts(event: any) {
    this.page += 1;
    event.target.complete();
  }

  /**
   * Reload page
   */
  public doRefresh(event: any) {
    this.getPosts();

    event.target.disabled = true;
    event.target.complete();
    setTimeout(
      () => {
        event.target.disabled = false;
      },
      100,
    );
  }

  /**
   * Get content cards
   */
  private getPosts() {
    this.http.getDailySuggestions((this.globalStore.state.userId ? this.globalStore.state.userId : 0)).toPromise().then((res) => {
      this.posts = [];
      this.page = 1;
      this.posts = this.posts.concat(res);
    });
  }

  // ------------------------------
  // Testing Functions
  // ------------------------------

  /**
   * Sign the user in (testing purposes)
   */
  public yo() {
    this.globalStore.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTY3NTA3NzIyLCJleHAiOjE1NzAwOTk3MjJ9.CSWF6vvdt8z4rFiZ-jmqdysbav9_zOyhiTpgOR1Sqt8');
  }

  /**
   * Log the user out of the application
   */
  public logOut() {
    this.globalStore.removeToken();
    // this.router.navigate(['app/home']);
  }

}
