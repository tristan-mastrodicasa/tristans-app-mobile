import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Response } from './response'

import { SERVER_URL } from '../../../environments/environment';

@Injectable()
export class BackendApiService {

  private apiUrl: string = SERVER_URL;

  constructor(private http: HttpClient) { }


}
