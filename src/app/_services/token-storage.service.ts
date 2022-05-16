import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public subjectIsLoggedIn = new BehaviorSubject<{isLoged: boolean, cameFromLoggin: boolean}>({isLoged: localStorage.getItem(TOKEN_KEY) != null, cameFromLoggin: false});
  public isLoggedIn = this.subjectIsLoggedIn.asObservable();

  constructor() {}

  public signOut(): void {
    localStorage.clear();
    this.subjectIsLoggedIn.next({isLoged: false, cameFromLoggin: false});
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);

    this.subjectIsLoggedIn.next({isLoged: true, cameFromLoggin: true});
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
   
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  

  public exist(key : string): boolean {
    return ! (localStorage.getItem(key) === null || localStorage.getItem(key) === '');
  }
}
