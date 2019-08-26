import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ContentCard } from '../../services/backend-api/response.interface';
import { GlobalStore } from '../../state/global.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private posts = [] as ContentCard[];
  private cardsPerRequest = 6;
  private page = 1;

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore
  ) { }

  /**
   * Handles the inifinite scroll functionality
   */
  public ngOnInit() {

    // Test Http Get // get reqest can later be changed to get relevent data from server, eg in this case it would need to get memes for the users home
    this.http.getContentCards('home', 'myUserId', this.cardsPerRequest, this.page).toPromise().then((res) => {
      this.posts = this.posts.concat(res);
    });
  }

  /**
   * When users scroll near the bottom of the view, call for more posts
   * @param  event Event object
   */
  private loadPosts(event: any) {

    this.page++;
    this.http.getContentCards('home', 'myUserId', this.cardsPerRequest, this.page).toPromise().then((res) => {

      this.posts = this.posts.concat(res);

      event.target.complete();

    });

  }

  /**
   * Sign the user in (testing purposes)
   */
  private yo() {
    this.globalStore.logIn('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXR0aW5ncyI6eyJub3RpZmljYXRpb25zIjp7ImRpc2FibGVkIjpmYWxzZX19LCJuZXR3b3JrIjp7ImZvbGxvd2VycyI6eyJ1c2VycyI6W119LCJmb2xsb3dpbmciOnsidXNlcnMiOltdfX0sIm1pc2MiOnsibmF0aXZlQXBwSW5zdGFsbGVkIjpmYWxzZX0sInVzZXJuYW1lIjpudWxsLCJmaXJzdE5hbWUiOm51bGwsImluZmx1ZW5jZSI6MCwiX2lkIjoiNWNmMzMwODYwZmZlMTAxYjQ4YTBmY2M0IiwicHJvZmlsZSI6eyJub3RpZmljYXRpb25fc2V0dGluZ3MiOnsiZGlzYWJsZWQiOmZhbHNlfSwibmF0aXZlX2FwcF9pbnN0YWxsZWQiOmZhbHNlLCJwaG90b3MiOltdfSwic3RhdGlzdGljcyI6eyJpbmZsdWVuY2UiOjAsImZvbGxvd2VycyI6W10sImZvbGxvd2luZyI6W119LCJmYmlkIjoxMzAxMDQ4NDcwMDQ2ODA2LCJmaXJzdG5hbWUiOiJUcmlzdGFuIiwibGFzdG5hbWUiOiJNYXN0cm9kaWNhc2EiLCJfX3YiOjAsIm5vdGlmaWNhdGlvbnMiOltdLCJhY3Rpdml0eSI6W10sImlhdCI6MTU2MDE1NjQ4Mn0.ZhDJCRWqX7Ektw57oep6BtQM3dk30IBDMuRRxyblY_s');
  }

}
