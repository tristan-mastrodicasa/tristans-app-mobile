import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { BackendApiService } from 'core/services';
import { ContentCard } from 'core/models';

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

  public results = 5;
  public page = 1;

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

    this.http.getCanvasMemes(this.canvasId).toPromise().then((res) => {
      this.page = 1;
      this.memes = this.memes.concat(res);
    });

  }

  /**
   * Show more memes
   * @param  event Event object
   */
  public showMoreMemes(event: any) {
    this.page += 1;
    event.target.complete();
  }

}
