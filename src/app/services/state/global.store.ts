import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { GlobalState } from './global.state';

import { Store } from 'rxjs-observable-store';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * State Management Service
 * Uses a combination of localstorage and observables to manage state across the application
 * Local storage manages persistent client state, observables manage session state
 */
@Injectable()
export class GlobalStore extends Store<GlobalState>{

  private jwt: JwtHelperService;

  constructor(private storage: Storage) {
    super(new GlobalState());
    this.getStateFromStorage();
    this.jwt = new JwtHelperService(); // Sorry it had to come to this mom
  }

  getStateFromStorage() {

    this.storage.get('state').then((val) => {

      if(val != null) {

        this.setState({
          ...val,
          initialized: true,
        });

      } else {

        this.setState({
          ...this.state,
          initialized: true,
        });

      }

    });

  }

  /**
   * Checks if the user is logged in, based on local storage, primarily used for the route guards
   * @return Promise<boolean>
   */
  get loggedIn(): Promise<boolean> {

    return this.storage.get('state').then((state) => {

      if(state.jwt_token == null) return false;
      else return true;

    });

  }

  logIn(jwt) {
    this.setState({
      ...this.state,
      jwt_token: jwt,
      user_data: this.jwt.decodeToken(jwt),
    });

    this.storage.set('state', this.state);
  }

  logOut() {
    this.setState({
      ...this.state,
      jwt_token: null,
      user_data: null,
    });

    this.storage.set('state', this.state);
  }

  userInitialized() {
    this.setState({
      ...this.state,
      userInitialized: true,
    });
  }

}
