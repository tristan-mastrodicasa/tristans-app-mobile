import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Profile, UserItem, ContentCard, Token } from './response.interface';
import { GlobalStore } from '../../state/global.store';

import { environment } from '../../../environments/environment';

/** @todo Add .pipe(catchError(this.handleError)); to all requests in the future */
/** @todo Add the loading display to this file */
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
   * Send the server the authcode and return a cookie for the user to login with
   * @param  authCode Auth code for server authentication with google
   * @return Observable<any> (Response from the server)
   */
  public googleLogIn(authCode: string): Observable<Token> {
    return this.http.post<Token>(environment.serverUrl + 'auth/google/authcode', { code: authCode });
  }

  /**
   * Test
   */
  public test(): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.serverUrl + 'auth/test');
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
   * Test request for required profile data from local DB
   * @param  id Id string of the user profile
   * @return    Array of user profiles
   */
  public getProfileById(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl + `profiles/${id}`);
  }

  /**
   * Get an array of user items for a specific view
   * @param  segment   What kind of useritems to be populated
   * @param  userId    Id of the user we are collecting the network user items from
   * @param  results   How many user items to return per request
   * @param  page      Pagnation: How many user items in we are (results*page)
   * @return          Array of user items
   */
  public getNetworkUserItems(segment: string, userId: string, results: number, page: number): Observable<UserItem[]> {

    let params: HttpParams = new HttpParams()
      .set('category', segment)
      .set('results', results.toString())
      .set('page', page.toString());

    return this.http.get<UserItem[]>(this.apiUrl + `users/${userId}/network`, { params });
  }

  /**
   * Get a user item from an id
   * @param  userId ID of user
   * @return        User Item
   */
  public getUserItemById(userId: string): Observable<UserItem> {
    return this.http.get<UserItem>(this.apiUrl + `users/${userId}`);
  }

  /**
   * Get a list of content cards that the user can view
   * @param  target   Which view we will be populating
   * @param  userId   Id of the user we are collecting content for
   * @param  results  How many content cards to return per request
   * @param  page     Pagnation: How many content cards in we are (results*page)
   * @return          Array of content cards
   */
  public getContentCards(target: string, userId: string, results: number, page: number): Observable<ContentCard[]> {
    console.log('Page: ' + page);

    let params: HttpParams = new HttpParams()
      .set('target', target)
      .set('userId', userId)
      .set('results', results.toString())
      .set('page', page.toString());

    return this.http.get<ContentCard[]>(this.apiUrl + 'content',  { params });
  }

  /**
   * Get a set of memes that were created from a specific canvas
   * @param  canvasId Id of the canvas we want to retrieve memes from
   * @param  results  How many memes to return per request
   * @param  page     Pagnation: How many content cards in we are (results*page)
   * @return          Array of content cards
   */
  public getCanvasMemes(canvasId: string, results: number, page: number): Observable<ContentCard[]> {

    console.log('Page: ' + page);

    let params: HttpParams = new HttpParams()
      .set('results', results.toString())
      .set('page', page.toString());

    return this.http.get<ContentCard[]>(this.apiUrl + `canvases/${canvasId}/memes`, { params });

  }

  /**
   * Get a canvas card from an id
   * @param  canvasId ID of canvas
   * @return          Canvas card
   */
  public getCanvasById(canvasId: string): Observable<ContentCard> {
    return this.http.get<ContentCard>(this.apiUrl + `canvases/${canvasId}`);
  }

}
