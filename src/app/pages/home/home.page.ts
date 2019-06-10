import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { GlobalStore } from '../../services/state/global.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll) private infiniteScroll: IonInfiniteScroll;
  private postData = [];

  constructor(
    private http2: HttpClient,
    private nav: NavController,
    private http: BackendApiService,
    private globalStore: GlobalStore
  ) { }

  /**
   * Handles the inifinite scroll functionality
   * @param  infiniteScroll ROBERT WHAT IS THIS!?!?
   */
  public ngOnInit(infiniteScroll?) {

    // Test Http Get // get reqest can later be changed to get relevent data from server, eg in this case it would need to get memes from the user's network
    this.http2.get('api/heroes').subscribe((response) => {
      this.postData = this.postData.concat(response);
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
    });
  }

  /**
   * Handles the inifinite scroll functionality
   * @param  infiniteScroll ROBERT WHAT IS THIS!?!?
   */
  private loadPosts(infiniteScroll) {
    this.ngOnInit(infiniteScroll);
  }

  /**
   * Open the meme focus view
   */
  private openMeme() {
    this.nav.navigateRoot('/meme-focus');
  }

  /**
   * Sign the user in (testing purposes)
   */
  private yo() {
    this.globalStore.logIn("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXR0aW5ncyI6eyJub3RpZmljYXRpb25zIjp7ImRpc2FibGVkIjpmYWxzZX19LCJuZXR3b3JrIjp7ImZvbGxvd2VycyI6eyJ1c2VycyI6W119LCJmb2xsb3dpbmciOnsidXNlcnMiOltdfX0sIm1pc2MiOnsibmF0aXZlQXBwSW5zdGFsbGVkIjpmYWxzZX0sInVzZXJuYW1lIjpudWxsLCJmaXJzdE5hbWUiOm51bGwsImluZmx1ZW5jZSI6MCwiX2lkIjoiNWNmMzMwODYwZmZlMTAxYjQ4YTBmY2M0IiwicHJvZmlsZSI6eyJub3RpZmljYXRpb25fc2V0dGluZ3MiOnsiZGlzYWJsZWQiOmZhbHNlfSwibmF0aXZlX2FwcF9pbnN0YWxsZWQiOmZhbHNlLCJwaG90b3MiOltdfSwic3RhdGlzdGljcyI6eyJpbmZsdWVuY2UiOjAsImZvbGxvd2VycyI6W10sImZvbGxvd2luZyI6W119LCJmYmlkIjoxMzAxMDQ4NDcwMDQ2ODA2LCJmaXJzdG5hbWUiOiJUcmlzdGFuIiwibGFzdG5hbWUiOiJNYXN0cm9kaWNhc2EiLCJfX3YiOjAsIm5vdGlmaWNhdGlvbnMiOltdLCJhY3Rpdml0eSI6W10sImlhdCI6MTU2MDE1NjQ4Mn0.ZhDJCRWqX7Ektw57oep6BtQM3dk30IBDMuRRxyblY_s");
  }

}
