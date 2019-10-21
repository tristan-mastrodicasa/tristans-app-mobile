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
    this.getCanvas();
    this.getMemes();
  }

  /**
   * Get the canvas to focus
   */
  private getCanvas() {
    this.canvasId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.http.getCanvasById(this.canvasId).pipe(first()).subscribe((res) => {
      this.canvasCard = res;
      this.pageTitle = `${this.canvasCard.users.primary.firstName}'s Canvas`;
    });
  }

  /**
   * Get the memes for the canvas
   */
  private getMemes() {
    this.canvasId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.http.getCanvasMemes(this.canvasId).toPromise().then((res) => {
      this.memes = [];
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

  /**
   * Refrash canvas focus
   * @param  event Event object
   */
  public doRefresh(event: any) {
    this.getCanvas();
    this.getMemes();

    event.target.disabled = true;
    event.target.complete();
    setTimeout(
      () => {
        event.target.disabled = false;
      },
      100,
    );
  }

}
