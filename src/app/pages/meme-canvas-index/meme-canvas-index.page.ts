import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-meme-canvas-index',
  templateUrl: './meme-canvas-index.page.html',
  styleUrls: ['./meme-canvas-index.page.scss'],
})
export class MemeCanvasIndexPage implements OnInit {

  @ViewChild(IonInfiniteScroll) private infiniteScroll: IonInfiniteScroll;
  private postData = [];

  constructor(private http2: HttpClient, private nav: NavController) { }

  /**
   * Handles the inifinite scroll functionality
   * @param  infiniteScroll ROBERT WHAT IS THIS!?!?
   */
  public ngOnInit(infiniteScroll?: any) {

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
  private loadPosts(infiniteScroll: any) {
    this.ngOnInit(infiniteScroll);
  }

  /**
   * Open the meme focus view
   */
  private openMeme() {
    this.nav.navigateRoot('/meme-focus');
  }

}
