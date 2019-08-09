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

      if (val != null) {

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
  public get loggedIn(): Promise<boolean> {

    return this.storage.get('state').then((state) => {

      if (state == null || state.jwt_token == null) return false;
      else return true;

    });

  }

  /**
   * Update the state to reflect a logged in user, store the JWT and
   * the data encoded within it
   * @param  jwt The JWT token retrieved from the server
   */
  public logIn(jwt: string) {
    this.setState({
      ...this.state,
      jwt_token: jwt,
      user_data: this.jwt.decodeToken(jwt),
    });

    this.storage.set('state', this.state);
  }

  /**
   * Update the state to reflect a user who is not logged in
   */
  public logOut() {
    this.setState({
      ...this.state,
      jwt_token: null,
      user_data: null,
    });

    this.storage.set('state', this.state);
  }

  /**
   * Update the state to show that the user has been initialized
   */
  public userInitialized() {
    this.setState({
      ...this.state,
      userInitialized: true,
    });
  }

  /**
   * Update the state to signal a picture has been taken for use by the media upload view
   * @param contentURI A string giving the content URI for the taken image on the device (provided by camera.getPicture)
   */
  public pictureTaken(contentURI: string) {
    this.setState({
      ...this.state,
      pictureTaken: true,
      pictureData: contentURI
    });
  }

  /**
   * Reset the taken picture state
   */
  public resetPictureTaken() {
    this.setState({
      ...this.state,
      pictureTaken: false,
      pictureData: ''
    });
  }

  /**
   * Find out if a picture has been taken
   * @return has a picture been taken
   */
  public get hasPictureBeenTaken(): boolean {
    return this.state.pictureTaken;
  }

  /**
   * Get the picture content URI
   * @return content URI
   */
  public get pictureLocation(): string {
    return this.state.pictureData;
  }

}
