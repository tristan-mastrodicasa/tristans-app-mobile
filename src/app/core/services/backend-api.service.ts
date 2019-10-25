import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Observable } from 'rxjs';

import { IUserItem, IProfile, ContentCard, IHttpError, IUserSettings, IMobileDevice } from 'core/models';
import { GlobalStore } from 'state/global.store';

import { environment } from 'environments/environment';

/** @todo Add .pipe(catchError(this.handleError)); to all requests in the future */
/** @todo reform the return data and url endpoints when finished with api */
@Injectable()
export class BackendApiService {

  private apiUrl: string = (environment.serveFromCache ? 'api/' : environment.serverUrl);

  constructor(
    private http: HttpClient,
    private globalStore: GlobalStore,
    private fileTransfer: FileTransfer,
  ) { }

  /**
   * Generate the http headers for routes requiring authorization
   * @todo move this to an interceptor later
   * @return Object with http headers
   */
  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.globalStore.state.jwt}` });
  }

  /**
   * Send the server the authcode and return a cookie for the user to login with
   * @param  authCode Auth code for server authentication with google
   * @return Observable<any> (Response from the server)
   */
  public googleLogIn(authCode: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/google-authcode`, { code: authCode });
  }

  /**
   * Log into the service with facebook, send the access token to get a JWT
   * @param  accessToken Access token from facebook
   * @return             Auth token
   */
  public facebookLogIn(accessToken: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/facebook`, { access_token: accessToken });
  }

  /**
   * Test request for required profile data from local DB
   * @param  id Id string of the user profile
   * @return    Array of user profiles
   */
  public getProfileById(id: number): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.apiUrl}user/${id}`, { headers: this.authHeaders() });
  }

  /**
   * Get an array of user items for a specific view
   * @param  segment   What kind of useritems to be populated
   * @param  userId    Id of the user we are collecting the network user items from
   * @return          Array of user items
   */
  public getNetworkUserItems(segment: 'follow-backs' | 'followers' | 'following', userId: number): Observable<IUserItem[]> {
    return this.http.get<IUserItem[]>(`${this.apiUrl}user/${userId}/${segment}`, { headers: this.authHeaders() });
  }

  /**
   * Get a user item from an id
   * @param  userId ID of user
   * @return        User Item
   */
  public getUserItemById(userId: number): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.apiUrl}user/${userId}`, { headers: this.authHeaders() });
  }

  /**
   * Get a list of popular content cards that the user can view
   * @param  userId   Id of the user we are collecting content for
   * @return          Array of content cards
   */
  public getDailySuggestions(userId: number): Observable<ContentCard[]> {
    return this.http.get<ContentCard[]>(`${this.apiUrl}user/${userId}/daily-suggestions`,  { headers: this.authHeaders() });
  }

  /**
   * Get a list of content cards that the user can view
   * @param  userId   Id of the user we are collecting content for
   * @return          Array of content cards
   */
  public getUserContentCards(userId: number): Observable<ContentCard[]> {
    return this.http.get<ContentCard[]>(`${this.apiUrl}user/${userId}/content-cards`,  { headers: this.authHeaders() });
  }

  /**
   * Get a set of memes that were created from a specific canvas
   * @param  canvasId Id of the canvas we want to retrieve memes from
   * @return          Array of content cards
   */
  public getCanvasMemes(canvasId: number): Observable<ContentCard[]> {
    return this.http.get<ContentCard[]>(`${this.apiUrl}canvas/${canvasId}/memes`, { headers: this.authHeaders() });
  }

  /**
   * Get a canvas card from an id
   * @param  canvasId ID of canvas
   * @return          Canvas card
   */
  public getCanvasById(canvasId: number): Observable<ContentCard> {
    return this.http.get<ContentCard>(`${this.apiUrl}canvas/${canvasId}`, { headers: this.authHeaders() });
  }

  /**
   * Upload a canvas to the server
   * @param  filePath    Local path of the fiile
   * @param  description Description of the canvas
   * @return             Indication of success
   */
  public async uploadCanvas(filePath: string, description?: string): Promise<{ canvasId: number } | IHttpError[]> {

    if (environment.serveFromCache) {
      const canvas = { canvasId: 5 };
      return canvas; // Cannot serve from in memory DB since file transfer is not intetcepted
    }

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    const options: FileUploadOptions = {
      fileKey: 'canvas',
      fileName: 'canvasFile',
      params: {
        description,
      },
      headers: {
        Authorization: this.authHeaders().get('Authorization'),
      },
    };

    return fileTransfer.upload(filePath, `${environment.serverUrl}canvas`, options).then(
      (res) => {
        const canvasUploaded = JSON.parse(res.response);
        return canvasUploaded;
      },
      (err) => {
        const errors: IHttpError[] = JSON.parse(err.body).errors;
        return errors;
      },
    );

  }

  /**
   * Upload a meme to the server
   * @param  canvasid    Canvas to be memed
   * @param  filePath    Local path of the file
   * @return             Indication of success
   */
  public async uploadMeme(canvasid: number, filePath: string): Promise<{ memeId: number } | IHttpError[]> {

    if (environment.serveFromCache) {
      const meme = { memeId: 5 };
      return meme; // Cannot serve from in memory DB since file transfer is not intetcepted
    }

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    const options: FileUploadOptions = {
      fileKey: 'meme',
      fileName: 'memeFile',
      headers: {
        Authorization: this.authHeaders().get('Authorization'),
      },
    };

    return fileTransfer.upload(filePath, `${environment.serverUrl}meme?canvasid=${canvasid}`, options).then(
      (res) => {
        const memeUploaded = JSON.parse(res.response);
        return memeUploaded;
      },
      (err) => {
        const errors: IHttpError[] = JSON.parse(err.body).errors;
        return errors;
      },
    );

  }

  /**
   * Upload a new user image to the server
   * @param  filePath    Local path of the file
   * @return             Indication of success
   */
  public async uploadNewUserImage(userid: number, filePath: string): Promise<any | IHttpError[]> {

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    const options: FileUploadOptions = {
      fileKey: 'user_image',
      fileName: 'userImageFile',
      headers: {
        Authorization: this.authHeaders().get('Authorization'),
      },
      httpMethod: 'PUT',
    };

    return fileTransfer.upload(filePath, `${environment.serverUrl}user/${userid}/image`, options).then(
      (res) => {
        return JSON.parse(res.response);
      },
      (err) => {
        return JSON.parse(err.body).errors as IHttpError[];
      },
    );

  }

  /**
   * Search users in the database
   * @param  query    String to query the database with
   * @return          List of users
   */
  public searchUsers(query: string): Observable<IUserItem[]> {

    const params: HttpParams = new HttpParams()
      .set('query', query);

    return this.http.get<IUserItem[]>(`${this.apiUrl}user/`, { params, headers: this.authHeaders() });

  }

  /**
   * Send a request to the server to follow a user
   * You must subscribe to this function for the request to send
   * @param  userId User if of the user to follow
   */
  public follow(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/${userId}/follow`, {}, { headers: this.authHeaders() });
  }

  /**
   * Send a request to the server to unfollow a user
   * You must subscribe to this function for the request to send
   * @param  userId User if of the user to unfollow
   */
  public unfollow(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/${userId}/unfollow`, {}, { headers: this.authHeaders() });
  }

  /**
   * Send a request to the server to star a canvas
   * You must subscribe to this function for the request to send
   * @param  canvasId Canvas to star
   */
  public starCanvas(canvasId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}canvas/${canvasId}/star`, {}, { headers: this.authHeaders() });
  }

  /**
   * Send a request to the server to star a meme
   * You must subscribe to this function for the request to send
   * @param  memeId Meme to star
   */
  public starMeme(memeId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}meme/${memeId}/star`, {}, { headers: this.authHeaders() });
  }

  /**
   * Send a request to the server to unstar a canvas
   * You must subscribe to this function for the request to send
   * @param  canvasId Canvas to unstar
   */
  public unstarCanvas(canvasId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}canvas/${canvasId}/star`, { headers: this.authHeaders() });
  }

  /**
   * Send a request to the server to unstar a meme
   * You must subscribe to this function for the request to send
   * @param  memeId Meme to unstar
   */
  public unstarMeme(memeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}meme/${memeId}/star`, { headers: this.authHeaders() });
  }

  /**
   * Get the settings for a user
   * @param  userId User to get the settings for
   */
  public getUserSettings(userId: number): Observable<IUserSettings> {
    return this.http.get<IUserSettings>(`${this.apiUrl}user/${userId}/settings`, { headers: this.authHeaders() });
  }

  /**
   * Edit the settings of a user
   * @param  userId   The user to change the settings of
   * @param  settings The new settings of the user
   */
  public editUserSettings(userId: number, settings: IUserSettings): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}user/${userId}/settings`, settings, { headers: this.authHeaders() });
  }

  /**
   * Edit the user profile
   * @param  userId  User profile to edit
   * @param  profile New profile data
   */
  public editUserProfile(userId: number, profile: { username: string; firstName: string; }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}user/${userId}`, profile, { headers: this.authHeaders() });
  }

  /**
   * Delete a canvas
   * @param  canvasId The canvas to delete
   */
  public deleteCanvas(canvasId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}canvas/${canvasId}`, { headers: this.authHeaders() });
  }

  /**
   * Delete a meme
   * @param  memeId The meme to delete
   */
  public deleteMeme(memeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}meme/${memeId}`, { headers: this.authHeaders() });
  }

  /**
   * Update the device the user is using
   * @param  userId   The user using this device
   * @param  deviceId The device id to map to the user
   */
  public updateDevice(userId: number, deviceId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}user/${userId}/devices`, { deviceId } as IMobileDevice, { headers: this.authHeaders() });
  }

}
