import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Response } from './response';
import { GlobalStore } from '../state/global.store';

import { SERVER_URL } from '../../../environments/environment';

@Injectable()
export class BackendApiService {

  private apiUrl: string = SERVER_URL;
  private devUrl: string = 'api/';

  constructor(
    private http: HttpClient,
    private globalStore: GlobalStore
  ) { }

  genHttpOptions(reqType) {

    if (reqType == "protected_routes") {
      return {
        headers: new HttpHeaders({
          'Authorization': `JWT ${this.globalStore.state.jwt_token}`
        })
      }
    }

  }

  logIn(accessToken: string): Observable<Response> {
    return this.http.post<Response>(this.apiUrl + "authentication/login", { access_token: accessToken });
  }

  signUp(accessToken: string): Observable<Response> {
    return this.http.post<Response>(this.apiUrl + "authentication/signup", { access_token: accessToken });
  }

  testAuth(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl + "authentication/test", this.genHttpOptions("protected_routes"));
  }

}
