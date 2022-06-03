import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:60566/api/test/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:3333/users/list/');
  }

  sandMailForRegisterUser(user: User): Observable<any> {
    //TODO
    ///possibleUser/sendMail
    // return this.http.post('http://localhost:3333/send/mail/register/user/', {
    //   user
    // });
    return new Observable<any>()
  }
}
