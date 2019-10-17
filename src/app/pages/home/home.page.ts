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

  private posts: ContentCard[] = [];
  private cardsPerRequest = 6;
  private page = 1;

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore,
  ) { }

  /**
   * Handles the inifinite scroll functionality
   */
  public ngOnInit() {

    // Test Http Get // get reqest can later be changed to get relevent data from server, eg in this case it would need to get memes for the users home
    this.http.getContentCards('home', 1, this.cardsPerRequest, this.page).toPromise().then((res) => {
      this.posts = this.posts.concat(res);
    });
  }

  /**
   * When users scroll near the bottom of the view, call for more posts
   * @param  event Event object
   */
  public loadPosts(event: any) {

    this.page += 1;
    this.http.getContentCards('home', 1, this.cardsPerRequest, this.page).toPromise().then((res) => {

      this.posts = this.posts.concat(res);

      event.target.complete();

    });

  }

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
