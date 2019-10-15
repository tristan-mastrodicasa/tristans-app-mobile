import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendApiService } from 'core/services';

@Component({
  selector: 'app-meme-create',
  templateUrl: './meme-create.page.html',
  styleUrls: ['./meme-create.page.scss'],
})
export class MemeCreatePage {

  public image: string;

  constructor(
    private route: ActivatedRoute,
    private http: BackendApiService,
  ) { }

  /**
   * Collect the canvas image to modify
   */
  public ionViewWillEnter() {

    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.http.getCanvasById(id).toPromise().then((res) => {

      this.image = res.imagePath;

    });

  }

}
