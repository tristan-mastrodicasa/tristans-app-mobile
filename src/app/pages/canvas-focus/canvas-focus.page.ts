import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { BackendApiService } from 'services/backend-api/backend-api.service';
import { ContentCard } from 'models/data.types';

@Component({
  selector: 'app-canvas-focus',
  templateUrl: './canvas-focus.page.html',
  styleUrls: ['./canvas-focus.page.scss'],
})
export class CanvasFocusPage implements OnInit {

  public pageTitle = '';
  public canvasId: number;
  public canvasCard: ContentCard;
  public memes = [] as ContentCard[];

  private cardsPerRequest = 6;
  private page = 1;

  constructor(private http: BackendApiService, private route: ActivatedRoute) { }

  /**
   * Load the canvas and it's associated memes
   */
  public ngOnInit() {

    this.canvasId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.http.getCanvasById(this.canvasId).pipe(first()).subscribe((res) => {
      this.canvasCard = res;
      this.pageTitle = `${this.canvasCard.users.primary.firstName}'s Canvas`;
    });

    this.http.getCanvasMemes(this.canvasId, this.cardsPerRequest, this.page).toPromise().then((res) => {
      this.memes = this.memes.concat(res);
    });

  }

  /**
   * When users scroll near the bottom of the view, call for more posts
   * @param  event Event object
   */
  public loadMemes(event: any) {

    this.page += 1;
    this.http.getCanvasMemes(this.canvasId, this.cardsPerRequest, this.page).toPromise().then((res) => {

      this.memes = this.memes.concat(res);

      event.target.complete();

    });

  }

}
