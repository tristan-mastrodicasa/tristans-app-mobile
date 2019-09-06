import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader/dynamic-script-loader.service';

declare var $: any;

@Component({
  selector: 'app-meme-create',
  templateUrl: './meme-create.page.html',
  styleUrls: ['./meme-create.page.scss'],
})
export class MemeCreatePage implements OnInit {

  public image: string;

  constructor(
    private scriptLoader: DynamicScriptLoaderService,
    // private route: ActivatedRoute
  ) { }

  /**
   * Collect the canvas image to modify
   */
  public ngOnInit() {

    // const id = this.route.snapshot.paramMap.get('id');

    /** @todo Here is where we would construct the URL to call the API and return the image for the canvas id */
    this.image = 'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?width=700&crop=2:1';

    $(document).ready(() => {

      this.scriptLoader.load('jquery.memegenerator').then(() => {

         /** @todo fix the boldness of the meme text */
        console.log($('#meme').memeGenerator({
          useBootstrap: true,
          colorPicker: (_mg, selector) => {
            $(selector).parent().hide();
          },
          showAdvancedSettings: false,
        }));

      });

    });

  }

}
