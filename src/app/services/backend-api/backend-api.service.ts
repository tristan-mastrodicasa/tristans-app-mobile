import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Response } from './response';
import { GlobalStore } from '../state/global.store';

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
   * @return Observable<Response> (Response from the server)
   */
  public logIn(accessToken: string): Observable<Response> {
    return this.http.post<Response>(this.apiUrl + 'authentication/login', { access_token: accessToken });
  }

  /**
   * Register the user with the server
   * @param  accessToken Access token for facebook
   * @return Observable<Response> (Response from the server)
   */
  public signUp(accessToken: string): Observable<Response> {
    return this.http.post<Response>(this.apiUrl + 'authentication/signup', { access_token: accessToken });
  }

  /**
   * Test the authentication of the user
   * @return Honestly I have no idea, something, I think it yells at you
   */
  public testAuth(): any {
    return this.http.get(this.apiUrl + 'authentication/test', this.genHttpOptions('protected_routes'));
  }

}
