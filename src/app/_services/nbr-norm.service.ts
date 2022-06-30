import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NbrNormService {

  apiUrl = environment.apiURL + "nbr";

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
