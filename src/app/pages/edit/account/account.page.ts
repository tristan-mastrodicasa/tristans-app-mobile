import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalStore } from '../../../state/global.store';
import { BackendApiService } from '../../../services/backend-api/backend-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {

  constructor(
    private globalStore: GlobalStore,
    private router: Router,
    private http: BackendApiService
  ) { }

  /**
   * Log the user out of the application
   */
  public logOut() {
    this.globalStore.logOut();
    this.router.navigate(['app/home']);
  }

}
