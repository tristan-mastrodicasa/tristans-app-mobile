import { Component, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CanvasCard } from '../../services/backend-api/response';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent {

  @Input() public cardData: CanvasCard;

  constructor(private actionSheetController: ActionSheetController) { }

  /**
   * Present the additional actions for canvas cards
   */
  private async presentCanvasCardActions() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked: ' + this.cardData.cid);
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked: '  + this.cardData.cid);
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();

  }

}
