import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Sector} from "../models/sector";

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  apiUrl = environment.apiURL + "version";
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
