import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendApiService } from 'services/backend-api/backend-api.service';

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

    /** @todo Here is where we would construct the URL to call the API and return the image for the canvas id */

    this.http.getCanvasById(id).toPromise().then((res) => {

      console.log(this.image);
      // this.image = res.imagePath;
      const images = [
        'http://192.168.1.16:3000/api/canvas/image/eba73eb72985cf651aff8a80bc4761f5',
        'http://192.168.1.16:3000/api/canvas/image/d6856edf4de9ee13f849c6f983f9646f',
      ];
      this.image = images[Math.floor(Math.random() * images.length)];
      console.log('loaded');

      console.log(this.image);

    });

  }

}
