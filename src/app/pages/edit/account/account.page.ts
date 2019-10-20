import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { BackendApiService } from 'core/services';
import { GlobalStore } from 'state/global.store';
import { IUserSettings } from 'core/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public settings: IUserSettings;

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore,
    private router: Router,
    private location: Location,
  ) { }

  /**
   * Get user settings
   */
  public async ngOnInit() {
    const res = await this.http.getUserSettings(this.globalStore.state.userId).toPromise();
    this.settings = res;
  }

  /**
   * Save the new user settings
   */
  public async saveSettings() {
    await this.http.editUserSettings(this.globalStore.state.userId, this.settings).toPromise();
    this.location.back();
  }

  /**
   * Log the user out of the application
   */
  public logOut() {
    this.globalStore.removeToken();
    this.router.navigate(['app/home']);
  }

}
