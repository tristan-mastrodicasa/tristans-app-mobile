import { Component, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ContentCard } from '../../services/backend-api/response.interface';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent {

  @Input() public cardData: ContentCard;
  @Input() public cardView: 'default' | 'canvas-view' = 'default';

  constructor(private actionSheetController: ActionSheetController) { }

  /**
   * Present the additional actions for canvas cards
   */
  private async presentContentCardActions() {

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

    if (this.cardData.starred) this.cardData.stars += 1;
    else this.cardData.stars -= 1;

    /** @todo send star request to backend API */
  }

}
