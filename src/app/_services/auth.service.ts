import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:51217/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    console.log(email, password, 'teste')
    //return this.http.post(AUTH_API + 'signin', {
    return this.http.post('http://127.0.0.1:49716/sessions', {

      email,
      password
    }, httpOptions);
  }
  register(username: string, email: string, password: string): Observable<any> {

    //return this.http.post(AUTH_API + 'signup', {
    return this.http.post('http://127.0.0.1:49716/users', {
      email,
      password
    }, httpOptions);
  }
}
