import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Error, Profile, UserItem, CanvasCard } from './response';
import { GlobalStore } from '../../state/global.store';

import { SERVER_URL } from '../../../environments/environment';

@Injectable()
export class BackendApiService {

  private apiUrl: string = SERVER_URL;
  private devUrl = 'api/';

  constructor(
    private http: HttpClient,
    private globalStore: GlobalStore
  ) { }

  /**
   * Generate the http options for all https requsests based on the
   * type of request being sent
   * @param  reqType Type of request being sent
   * @return Object with http headers
   */
  private genHttpOptions(reqType: string): any {

    if (reqType === 'protected_routes') {
      return {
        headers: new HttpHeaders({
          Authorization: `JWT ${this.globalStore.state.jwt_token}`
        })
      };
    }

  }

  /**
   * Send request to server to recieve JWT for future requests
   * @param  accessToken Access token for facebook
   * @return Observable<Response<any>> (Response from the server)
   */
  public logIn(accessToken: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'authentication/login', { access_token: accessToken });
  }

  /**
   * Register the user with the server
   * @param  accessToken Access token for facebook
   * @return Observable<Response<any>> (Response from the server)
   */
  public signUp(accessToken: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'authentication/signup', { access_token: accessToken });
  }

  /**
   * Test the authentication of the user
   * @return Honestly I have no idea, something, I think it yells at you
   */
  public testAuth(): any {
    return this.http.get(this.apiUrl + 'authentication/test', this.genHttpOptions('protected_routes'));
  }

  /**
   * Test request for required profile data from local DB
   * @param  id Id string (mongoose) of the user profile
   * @return    Observable<Response<Profile>>
   */
  public getProfileById(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.devUrl + `profiles/${id}`);
  }

  /**
   * Test request for follow backs of the user
   * @param  id ID of the client user, (from which the followbacks will be collected)
   * @return    Observable<Response<UserItem[]>>
   */
  public getFollowBacks(id: string): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(this.devUrl + `followBacks`); // Send the id when a production server
  }

  /**
   * Test request for who the user is following
   * @param  id ID of the client user, (from which the following list will be collected)
   * @return    Observable<Response<UserItem[]>>
   */
  public getFollowing(id: string): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(this.devUrl + `following`); // Send the id when a production server
  }

  /**
   * Test request for the followers of the user
   * @param  id ID of the client user, (from which the follower list will be collected)
   * @return    Observable<Response<UserItem[]>>
   */
  public getFollowers(id: string): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(this.devUrl + `followers`); // Send the id when a production server
  }

  /**
   * Get a list of canvas cards that the user can view
   * @param  populationTarget Which view we will be populating, along with data about the view type
   * @param  results          How many canvases to return per request
   * @param  page             Pagnation: How many canvases in we are (results*page)
   * @return                  Observable<Response<CanvasCard[]>>
   */
  public getCanvasCards(populationTarget: {name: string, data: string}, results: number, page: number): Observable<CanvasCard[]> {
    console.log('Page: ' + page);
    return this.http.get<CanvasCard[]>(this.devUrl + `canvasCardList`);
  }

}
