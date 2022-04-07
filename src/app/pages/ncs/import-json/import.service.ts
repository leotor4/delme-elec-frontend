import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ImportService {
  API_URL = 'http://localhost:3333/';
  constructor(private http: HttpClient) {}

  post(json: any,type:string): Observable<any>{
    return this.http
        .post<any>(this.API_URL + type, JSON.parse(json))
  }
}
