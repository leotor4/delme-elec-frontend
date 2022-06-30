import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
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


  registerPassword(password:string, hashUser:string) {

    return this.http.post(AUTH_API + 'users/changePassword/', {
      password: password,
      token: hashUser
    }, httpOptions);
  }
}
