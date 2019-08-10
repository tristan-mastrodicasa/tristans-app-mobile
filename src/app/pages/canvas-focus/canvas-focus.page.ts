import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ContentCard } from '../../services/backend-api/response';

@Component({
  selector: 'app-canvas-focus',
  templateUrl: './canvas-focus.page.html',
  styleUrls: ['./canvas-focus.page.scss'],
})
export class CanvasFocusPage implements OnInit {

  private canvasId: string;
  private canvasCard: ContentCard;
  private memes = [] as ContentCard[];
  private cardsPerRequest = 6;
  private page = 1;

  constructor(private http: BackendApiService, private route: ActivatedRoute) { }

  /**
   * Load the canvas and it's associated memes
   */
  public ngOnInit() {

    this.canvasId = this.route.snapshot.paramMap.get('id');

    this.http.getCanvasById(this.canvasId).pipe(first()).subscribe((res) => {
      this.canvasCard = res;
    });

    this.http.getContentCards({name: 'profile', data: this.canvasId}, this.cardsPerRequest, this.page).pipe(first()).subscribe((res) => {
      this.memes = this.memes.concat(res);
    });

  }

  /**
   * When users scroll near the bottom of the view, call for more posts
   * @param  event Event object
   */
  private loadMemes(event: any) {

    this.page++;
    this.http.getContentCards({name: 'profile', data: this.canvasId}, this.cardsPerRequest, this.page).pipe(first()).subscribe((res) => {

      this.memes = this.memes.concat(res);

      event.target.complete();

    });

  }

}
