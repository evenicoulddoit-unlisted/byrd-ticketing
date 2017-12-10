import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs } from '@angular/http';

import { environment } from '../environments/environment';
import * as conf from './conf';
import { StorageService } from './storage.service';


/**
 * A very basic service providing API requests.
 *
 * Essentially it serves two purposes:
 * 1) Appends the API root to each request
 * 2) Passes an Authorization header with the user's auth-token when set.
 */
@Injectable()
export class RequestService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  public get(endpoint: string): Promise<any> {
    return this.http
      .get(this._getUrl(endpoint), this._getOptions())
      .toPromise();
  }

  public post(endpoint: string, data: any): Promise<any> {
    return this.http
      .post(this._getUrl(endpoint), data, this._getOptions())
      .toPromise();
  }

  /**
   * Append the API root to each request.
   */
  private _getUrl(endpoint: string): string {
    return `${environment.apiRoot}${endpoint}`;
  }

  /**
   * Pass custom HTTP Request headers with each request.
   */
  private _getOptions() {
    return { headers: this._getHeaders() };
  }

  /**
   * Add an Authorization header to all requests when set.
   */
  private _getHeaders() {
    const headers = {};
    const token = this.storageService.get(conf.STORAGE_AUTH_KEY);

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    return headers;
  }
}
