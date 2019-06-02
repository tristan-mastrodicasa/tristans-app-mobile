import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

import { GlobalStore } from '../state/global.store';

import { LogInPage } from '../../modals/log-in/log-in.page';

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private globalStore: GlobalStore,
    private router: Router,
    private modalController: ModalController
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    return this.globalStore.loggedIn.then((loggedIn: boolean) => {

      if (route.data.type == 'user-experience') {

        if(!loggedIn) {

          // If not logged in go to page and record the illegal action (if any) that lead to it //
          // When finished logging in go to original page //
          //this.router.navigate(['log-in']); // Do shit to log in
          this.presentModal();
          return false;

        } else return true;

      }

    });

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LogInPage,
      showBackdrop: true,
      cssClass: 'login-modal'
    });
    return await modal.present();
  }

}
