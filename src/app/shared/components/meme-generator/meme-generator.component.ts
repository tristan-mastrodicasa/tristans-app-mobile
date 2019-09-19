import { Component, Input, OnChanges } from '@angular/core';

import { DynamicScriptLoaderService } from 'services/dynamic-script-loader/dynamic-script-loader.service';

declare var $: any;

@Component({
  selector: 'app-meme-generator',
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.scss'],
})
export class MemeGeneratorComponent implements OnChanges {

  @Input() public canvas: string;

  constructor(private scriptLoader: DynamicScriptLoaderService) { }

  /**
   * Initialize the JQuery meme engine
   */
  public ngOnChanges() {

    this.scriptLoader.load('jquery.memegenerator').then(() => {

      console.log('loaded script?');

      this.linkMemeGenerator();

    });

  }

  /**
   * Link the meme generator
   */
  private linkMemeGenerator() {

    console.log($('#meme'));

    $('#meme').memeGenerator('destroy');

    $('#meme').memeGenerator({
      onInit: () => console.log('initilized'),
      useBootstrap: true,
      colorPicker: (_mg, selector) => {
        $(selector).parent().hide();
      },
      showAdvancedSettings: false,
    });

  }

}
