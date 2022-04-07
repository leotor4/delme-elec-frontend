import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:60566/api/test/';

@Injectable({
  providedIn: 'root'
})
export class NcsService {

  constructor(private http: HttpClient) { }

  getNcs() {
    return this.http.get('http://127.0.0.1:49716/ncs', { responseType: 'text' });
  }
}
