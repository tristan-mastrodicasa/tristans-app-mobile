import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  constructor(public menuCtrl: MenuController) { }

  /**
   * Toggle the side menu
   */
  private toggleMenu() {
    this.menuCtrl.toggle();
  }

}
