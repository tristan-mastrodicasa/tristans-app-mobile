import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { GlobalState } from './global.state'; //tslint:disable-line

import { Store } from 'rxjs-observable-store';
import { JwtHelperService } from '@auth0/angular-jwt';

import { JwtContent } from 'models/data.types';

/**
 * State Management Service
 * Uses a combination of localstorage and observables to manage state across the application
 * Local storage manages persistent client state, observables manage session state
 */
@Injectable()
export class GlobalStore extends Store<GlobalState> {

  private jwt: JwtHelperService;

  constructor(private storage: Storage) {
    super(new GlobalState());
    this.getStateFromStorage();
    this.jwt = new JwtHelperService(); // Sorry it had to come to this mom
  }

  /**
   * Collect the stored state object from the local storage of the client. Update
   * the initialized flag to 'true'
   */
  private getStateFromStorage() {

    this.storage.get('state').then((val) => {

      if (val != null) this.setState({ ...val });
      else this.setState({ ...this.state });

    });

  }

  /**
   * Checks if the user is logged in, based on local storage, primarily used for the route guards
   * @return Promise<boolean>
   */
  public get hasToken(): Promise<boolean> {

    return this.storage.get('state').then((state) => {
      if (state == null || state.jwt == null) return false;
      return true;
    });

  }

  /**
   * Update the state to reflect a logged in user, store the JWT and
   * the user id encoded within it
   * @param  jwt The JWT token retrieved from the server
   */
  public setToken(jwt: string) {

    const jwtContent: JwtContent = this.jwt.decodeToken(jwt);

    this.setState({
      ...this.state,
      jwt,
      userId: jwtContent.id,
    });

    this.storage.set('state', this.state);
  }

  /**
   * Update the state to reflect a user who is not logged in
   */
  public removeToken() {
    this.setState({
      ...this.state,
      jwt: null,
      userId: null,
    });

    this.storage.set('state', this.state);
  }

  /**
   * Update the state to signal a picture has been taken for use by the media upload view
   * @param contentURI A string giving the content URI for the taken image on the device (provided by camera.getPicture)
   */
  public setCanvasPicture(contentURI: string) {
    this.setState({
      ...this.state,
      stagedCanvasPicture: contentURI,
    });
  }

  /**
   * Reset the taken picture state
   */
  public resetCanvasPicture() {
    this.setState({
      ...this.state,
      stagedCanvasPicture: null,
    });
  }

}
