import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ContentCard, EContentType } from 'core/models';
import { BackendApiService } from 'core/services';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent implements OnInit {

  @Input() public cardData: ContentCard;
  @Input() public cardView: 'default' | 'canvas-view' = 'default';

  constructor(
    private actionSheetController: ActionSheetController,
    private http: BackendApiService,
  ) { }

  /**
   * Initialize the description
   */
  public ngOnInit() {
    if (!this.cardData.description) this.cardData.description = 'No description';
  }

  /**
   * Present the additional actions for canvas cards
   */
  public async presentContentCardActions() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log(`Delete clicked: ${this.cardData.id}`);
        },
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log(`Share clicked: ${this.cardData.id}`);
        },
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        },
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        },
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      }],
    });

    await actionSheet.present();

  }

  /**
   * Manages the starring action for content cards
   */
  public starToggle() {
    this.cardData.starred = (this.cardData.starred ? false : true);

    if (this.cardData.starred) {
      this.cardData.stars += 1;
      if (this.cardData.type === EContentType.Canvas) this.http.starCanvas(this.cardData.id).toPromise().then(_ => null);
      if (this.cardData.type === EContentType.Meme ||
          this.cardData.type === EContentType.MemeWithHost) this.http.starMeme(this.cardData.id).toPromise().then(_ => null);
    } else {
      this.cardData.stars -= 1;
      if (this.cardData.type === EContentType.Canvas) this.http.unstarCanvas(this.cardData.id).toPromise().then(_ => null);
      if (this.cardData.type === EContentType.Meme ||
          this.cardData.type === EContentType.MemeWithHost) this.http.unstarMeme(this.cardData.id).toPromise().then(_ => null);
    }
  }

}
