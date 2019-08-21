import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Profile, UserItem, ContentCard } from './response';
import { GlobalStore } from '../../state/global.store';

import { environment } from '../../../environments/environment';

/** @todo Add .pipe(catchError(this.handleError)); to all requests in the future */
@Injectable()
export class BackendApiService {

  private apiUrl: string = (environment.serveFromCache ? 'api/' : environment.serverUrl);

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
  private genHttpOptions(reqType: string): { headers: HttpHeaders } {

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
   * @return Observable<any> (Response from the server)
   */
  public logIn(accessToken: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'authentication/login', { access_token: accessToken });
  }

  /**
   * Register the user with the server
   * @param  accessToken Access token for facebook
   * @return Observable<any> (Response from the server)
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
   * @return    Array of user profiles
   */
  public getProfileById(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl + `profiles/${id}`);
  }

  /**
   * Get an array of user items for a specific view
   * @param  segment   What kind of useritems to be populated
   * @param  profileId Id of the user we are collecting the network user items from
   * @param  results   How many user items to return per request
   * @param  page      Pagnation: How many user items in we are (results*page)
   * @return          Array of user items
   */
  public getNetworkUserItems(segment: string, profileId: string, results: number, page: number): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(this.apiUrl + `user/${profileId}/network/${segment}`);
  }

  /**
   * Get a user item from an id
   * @param  id ID of user
   * @return    User Item
   */
  public getUserItemById(id: string): Observable<UserItem> {
    return this.http.get<UserItem>(this.apiUrl + `userItems/${id}`);
  }

  /**
   * Get a list of content cards that the user can view
   * @param  params   Which view we will be populating, along with data about the view type
   * @param  results  How many canvases to return per request
   * @param  page     Pagnation: How many canvases in we are (results*page)
   * @return          Array of content cards
   */
  public getContentCards(params: {name: string, extra: any}, results: number, page: number): Observable<ContentCard[]> {
    console.log('Page: ' + page);
    return this.http.get<ContentCard[]>(this.apiUrl + `contentCardList`);
  }

  /**
   * Get a canvas card from an id
   * @param  id ID of canvas
   * @return    Canvas card
   */
  public getCanvasById(id: string): Observable<ContentCard> {
    return this.http.get<ContentCard>(this.apiUrl + `canvasList/${id}`);
  }

}
