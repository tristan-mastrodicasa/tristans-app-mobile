import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalStore } from '../../../services/state/global.store';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {

  constructor(
    private globalStore: GlobalStore,
    private router: Router
  ) { }

  /**
   * Log the user out of the application
   */
  private logOut() {
    this.globalStore.logOut();
    this.router.navigate(['app/home']);
  }
}
