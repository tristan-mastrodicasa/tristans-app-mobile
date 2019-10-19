import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BackendApiService, LoadingService } from 'core/services';
import { MemeGeneratorComponent } from 'shared/components/meme-generator/meme-generator.component';
import { GlobalStore } from 'state/global.store';

@Component({
  selector: 'app-meme-create',
  templateUrl: './meme-create.page.html',
  styleUrls: ['./meme-create.page.scss'],
})
export class MemeCreatePage {

  @ViewChild(MemeGeneratorComponent) public memeGenerator: MemeGeneratorComponent;
  public image: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: BackendApiService,
    private store: GlobalStore,
    private loading: LoadingService,
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

  /**
   * Upload the meme
   */
  public async confirmUpload() {

    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    await this.loading.presentLoading();
    const res = await this.http.uploadMeme(id, await this.memeGenerator.saveMeme());
    await this.loading.closeLoading();

    if (Array.isArray(res)) return this.loading.presentError((res[0].detail ? res[0].detail : res[0].title));
    return this.router.navigate(['profile', this.store.state.userId], { queryParams: { refresh: new Date().getTime() } });
  }

}
