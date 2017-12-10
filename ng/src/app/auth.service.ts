import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

import * as conf from './conf';
import { RequestService } from './request.service';
import { StorageService } from './storage.service';


/**
 * A very naive representation of a user.
 *
 * Expands on the incoming user data to provide a helper "loggedIn" property.
 */
class User {
  pk?: number;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;

  constructor(data = {}) {
    Object.keys(data).forEach(key => this[key] = data[key]);
  }

  get loggedIn() {
    return !!this.pk;
  }
}


// Returned whenever the user is not currently logged in
const AnonymousUser: User = new User();


/**
 * A service to authenticate the user with the ticketing system.
 *
 * It provides a subscribe method to allow all interested parties to retrieve
 * the current user. A ReplaySubject allows new subscribers to both get the
 * current user details as well as continue to receive future updates.
 */
@Injectable()
class AuthService {
  private _user: User;
  private _userRequest: Promise<any>;
  private _userSubject: ReplaySubject<any>;
  private _userObservable: Observable<any>;

  constructor(
    private requestService: RequestService,
    private storageService: StorageService
  ) {
    this._userSubject = new ReplaySubject(1);
    this._userObservable = this._userSubject.asObservable();
  }

  /**
   * Create a subscription from the given function(s).
   *
   * If no user request has previously been made, create one.
   */
  public subscribe(...args: any[]): Subscription {
    const subscription = this._userObservable.subscribe(...args);

    if (!this._userRequest) {
      this._getUser();
    }

    return subscription;
  }

  /**
   * Attempt to log the user in with the given credentials.
   * On success, store the auth token returned by the server.
   */
  public login(email: string, password: string): any {
    return (
      this.requestService.post(`auth/login/`, { email, password })
      .then(response => this._storeKey(response.key))
      .then(() => this._getUser())
    );
  }

  /**
   * Log the user out, destroying the reference to their auth token.
   */
  public logout(): void {
    this._removeKey();
    this._userSubject.next(AnonymousUser);
  }

  /**
   * Request the current user's details from the user.
   * When unauthenticated, returns an AnonymousUser
   */
  private _getUser(): Promise<User> {
    this._userRequest = this.requestService.get(`auth/user/`)
      .then(userData => new User(userData))
      .catch(() => AnonymousUser)
      .then((user: User) => {
        this._userSubject.next(user);
        return user;
      });

    return this._userRequest;
  }

  private _storeKey(key: string) {
    this.storageService.set(conf.STORAGE_AUTH_KEY, key);
  }

  private _removeKey() {
    this.storageService.remove(conf.STORAGE_AUTH_KEY);
  }
}


export { AuthService, User };
