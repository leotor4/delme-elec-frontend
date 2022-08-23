import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NbrNormService {

  apiUrl = environment.apiURL + "nbr";

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(this.apiUrl);
  }
}
