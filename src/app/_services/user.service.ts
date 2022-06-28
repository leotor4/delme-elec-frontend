import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.http.get(environment.apiURL + 'users/list/');
  }

  sendMailForRegisterUser(user: User): Observable<any> {
    
    return this.http.post(environment.apiURL + "users/sendPasswordMail/", {
      email:user.email,
    })

  }
}
