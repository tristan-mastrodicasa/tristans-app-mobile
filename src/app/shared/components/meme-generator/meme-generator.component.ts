import { Component, Input, OnChanges } from '@angular/core';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

import { DynamicScriptLoaderService } from 'shared/services/dynamic-script-loader.service';

declare var $: any;

@Component({
  selector: 'app-meme-generator',
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.scss'],
})
export class MemeGeneratorComponent implements OnChanges {

  @Input() public canvas: string;

  constructor(
    private scriptLoader: DynamicScriptLoaderService,
    private file: File,
  ) { }

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
   * @todo Scale default text depending on the size of the image
   */
  private linkMemeGenerator() {

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

  /**
   * Save the meme to the device to be later uploaded
   * @return filename
   */
  public async saveMeme(): Promise<string> {
    const blob = $('#meme').memeGenerator('save');

    const path = this.file.dataDirectory;
    const options: IWriteOptions = { replace: true };

    const res = await this.file.writeFile(path, 'image.png', blob, options);
    return res.toURL();
  }

}
