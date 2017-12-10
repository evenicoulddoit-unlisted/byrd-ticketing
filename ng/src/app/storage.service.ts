import { Injectable } from '@angular/core';


/**
 * A super-lightweight wrapping around localStorage to facilitate auth-tokens
 * being stored and passed with each request.
 */
@Injectable()
export class StorageService {

  constructor() { }

  get(key): string {
    return localStorage.getItem(key);
  }

  set(key, value): void {
    return localStorage.setItem(key, value);
  }

  remove(key): void {
    return localStorage.removeItem(key);
  }
}
