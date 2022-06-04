import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3333/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'sessions', {
      email,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'users', {
      email,
      username:username,
      password
    }, httpOptions);
  }


  registerPassword(registerPassword:string, confirmPassword: string, hashUser:string) {

    return this.http.post(AUTH_API + 'user/register/password', {
      registerPassword,
      confirmPassword,
      hashUser
    }, httpOptions);
  }
}
